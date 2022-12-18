import { Injectable } from '@nestjs/common'
import { UserGroupSeasonTopicId } from './dto/create-user-group-season-topic.input'
import { UpdateUserGroupSeasonTopicInput } from './dto/update-user-group-season-topic.input'
import { PrismaService } from '../../prisma/prisma.service'
import { UserGroupSeasonTopic } from './entities/user-group-season-topic.entity'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterUserGroupSeasonTopicInput } from './dto/filter-user-group-season-topic-input'
import { PaginationUserGroupSeasonTopic } from '../../common/page/pagination-info'
import { UserGroupSeasonTopicRepository } from './user-group-season-topic.repository'
import { UserGroupSeasonTopicProblemService } from '../user-group-season-topic-problem/user-group-season-topic-problem.service'
import { UpdateUserGroupSeasonTopicProblemInput } from '../user-group-season-topic-problem/dto/update-user-group-season-topic-problem.input'
import { GroupSeasonTopicRepository } from '../../group-relations/group-season-topic/group-season-topic.repository'
import { ComfortLevelEnum } from '@prisma/client'
import { GroupSeasonTopic } from '../../group-relations/group-season-topic/entities/group-season-topic.entity'

@Injectable()
export class UserGroupSeasonTopicService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userGroupSeasonTopicRepository: UserGroupSeasonTopicRepository,
    private readonly groupSeasonTopicRepository: GroupSeasonTopicRepository,
    private readonly userGroupSeasonTopicProblemService: UserGroupSeasonTopicProblemService,
  ) {}

  async userGroupSeasonTopic({
    userId,
    groupId,
    seasonId,
    topicId,
  }: UserGroupSeasonTopicId): Promise<UserGroupSeasonTopic> {
    let userGroupSeasonTopic = await this.userGroupSeasonTopicRepository.findOne({
      userId_groupId_seasonId_topicId: { userId, groupId, seasonId, topicId },
    })
    const userGroupSeasonTopicProblems =
      await this.userGroupSeasonTopicProblemService.userGroupSeasonTopicProblems({
        userId,
        groupId,
        seasonId,
        topicId,
      })
    if (userGroupSeasonTopic === undefined || userGroupSeasonTopic === null) {
      const groupSeasonTopic = await this.groupSeasonTopicRepository.findOne({
        groupId_seasonId_topicId: {
          groupId,
          seasonId,
          topicId,
        },
      })
      userGroupSeasonTopic = {
        seasonId,
        groupId,
        topicId,
        userId,
        userGroupSeasonTopicProblems: [],
        comfortLevel: ComfortLevelEnum.UNCOMFORTABLE,
        topic: groupSeasonTopic.topic,
      }
    }
    userGroupSeasonTopic.userGroupSeasonTopicProblems = userGroupSeasonTopicProblems.items
    return userGroupSeasonTopic
  }

  async userGroupSeasonTopics(
    { ...filterUserGroupSeasonTopicInput }: FilterUserGroupSeasonTopicInput,
    { take, skip }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationUserGroupSeasonTopic> {
    // TODO: do mapping with groupSeasonTopics
    const { groupId, seasonId, userId } = filterUserGroupSeasonTopicInput
    const count = await this.userGroupSeasonTopicRepository.count(
      filterUserGroupSeasonTopicInput,
    )
    const users = await this.prismaService.user.findMany({
      where: { groupId, id: userId },
    })
    const userGroupSeasonTopics: UserGroupSeasonTopic[] =
      await this.userGroupSeasonTopicRepository.findAll({
        skip,
        take,
        where: filterUserGroupSeasonTopicInput,
      })
    const userGroupSeasonTopicProblems =
      await this.userGroupSeasonTopicProblemService.userGroupSeasonTopicProblems({
        ...filterUserGroupSeasonTopicInput,
      })
    const groupSeasonTopics: GroupSeasonTopic[] =
      await this.groupSeasonTopicRepository.findAll({
        skip,
        take,
        where: { groupId, seasonId },
      })
    const result: UserGroupSeasonTopic[] = []
    const mappedUGSTs: { ['key']?: UserGroupSeasonTopic } = {}
    for (const userGroupSeasonTopic of userGroupSeasonTopics) {
      mappedUGSTs[
        `${userGroupSeasonTopic.userId}${userGroupSeasonTopic.groupId}${userGroupSeasonTopic.seasonId}${userGroupSeasonTopic.topicId}`
      ] = userGroupSeasonTopic
    }
    for (const groupSeasonTopic of groupSeasonTopics) {
      for (const user of users) {
        const check =
          mappedUGSTs[
            `${user.id}${groupSeasonTopic.groupId}${groupSeasonTopic.seasonId}${groupSeasonTopic.topicId}`
          ]
        if (check) {
          result.push(check)
        } else {
          result.push({
            seasonId: groupSeasonTopic.seasonId,
            userId: user.id,
            groupId: user.groupId,
            topicId: groupSeasonTopic.topicId,
            comfortLevel: ComfortLevelEnum.UNCOMFORTABLE,
            topic: groupSeasonTopic.topic,
            userGroupSeasonTopicProblems: userGroupSeasonTopicProblems.items.filter(
              u =>
                u.userId === user.id &&
                u.groupId === user.groupId &&
                u.seasonId === groupSeasonTopic.seasonId &&
                u.topicId === groupSeasonTopic.topicId,
            ),
          })
        }
      }
    }
    return {
      items: result,
      pageInfo: { skip, take, count },
    }
  }

  async updateUserTopicComfortability({
    id,
    ...updates
  }: UpdateUserGroupSeasonTopicInput): Promise<UserGroupSeasonTopic> {
    const { userId, groupId, seasonId, topicId } = id
    // TODO: get group from user, and search for GroupSeasonTopic if it doesn't exist,
    // TODO: throw NotFoundException "topic hasn't been added to your group"
    // TODO: check if the groupSeason the user in is active if not throw "season is not active error"
    // TODO: upsert UserGroupSeason
    return this.prismaService.userGroupSeasonTopic.upsert({
      where: {
        userId_groupId_seasonId_topicId: { userId, groupId, seasonId, topicId },
      },
      create: {
        userGroupSeason: {
          connect: {
            userId_groupId_seasonId: { userId, groupId, seasonId },
          },
        },
        groupSeasonTopic: {
          connect: { groupId_seasonId_topicId: { groupId, seasonId, topicId } },
        },
        topic: {
          connect: { id: topicId },
        },
      },
      update: updates,
      include: {
        topic: true,
        userGroupSeasonTopicProblems: {
          include: {
            problem: { include: { tags: true } },
          },
        },
      },
    })
  }

  async updateUserProblemStatus(
    updateUserGroupSeasonTopicProblemInput: UpdateUserGroupSeasonTopicProblemInput,
  ) {
    // TODO: get group from the user,
    // TODO: search for GroupSeasonTopicProblem from the groupId if not found,
    // TODO: throw NotFoundException "problem under this topic hasn't been added to your group"
    // TODO: check if the groupSeason the user in is active if not throw "season is not active error"
    // TODO: upsert UserGroupSeason and then UserGroupSeasonTopic
    return this.userGroupSeasonTopicProblemService.updateUserGroupSeasonTopicProblem(
      updateUserGroupSeasonTopicProblemInput,
    )
  }

  async removeUserGroupSeasonTopic({
    userId,
    groupId,
    seasonId,
    topicId,
  }: UserGroupSeasonTopicId) {
    try {
      await this.userGroupSeasonTopicRepository.remove({
        userId_groupId_seasonId_topicId: { userId, groupId, seasonId, topicId },
      })
    } catch (e) {
      console.log(`Fail to delete user topic with id ${userId}`, ' : ', e)
      throw new Error(`Fail to delete user topic with id ${userId}`)
    }
    return 1
  }
}
