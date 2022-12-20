import { Injectable, NotFoundException } from '@nestjs/common'
import { UserGroupSeasonTopicId } from '../../app/user-group-season-topic/dto/create-user-group-season-topic.input'
import {
  UpdateUserGroupSeasonTopicInput,
} from '../../app/user-group-season-topic/dto/update-user-group-season-topic.input'
import { PrismaService } from '../../prisma/prisma.service'
import { UserGroupSeasonTopic } from '../../app/user-group-season-topic/entities/user-group-season-topic.entity'
import { PaginationInput } from '../../common/page/pagination.input'
import {
  FilterUserGroupSeasonTopicInput,
} from '../../app/user-group-season-topic/dto/filter-user-group-season-topic-input'
import { PaginationUserGroupSeasonTopic } from '../../common/page/pagination-info'
import { UserGroupSeasonTopicRepository } from '../../app/user-group-season-topic/user-group-season-topic.repository'
import { UserGroupSeasonTopicProblemService } from './user-group-season-topic-problem.service'
import {
  UpdateUserGroupSeasonTopicProblemInput,
} from '../../app/user-group-season-topic-problem/dto/update-user-group-season-topic-problem.input'
import { GroupSeasonTopicRepository } from '../../app/group-season-topic/group-season-topic.repository'
import { ComfortLevelEnum } from '@prisma/client'
import { GroupSeasonTopic } from '../../app/group-season-topic/entities/group-season-topic.entity'
import {
  UserGroupSeasonTopicProblemRepository,
} from '../../app/user-group-season-topic-problem/user-group-season-topic-problem.repository'
import { UserGroupSeasonRepository } from '../../app/user-group-season/user-group-season.repository'

@Injectable()
export class UserGroupSeasonTopicService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userGroupSeasonRepository: UserGroupSeasonRepository,
    private readonly userGroupSeasonTopicRepository: UserGroupSeasonTopicRepository,
    private readonly userGroupSeasonTopicProblemRepository: UserGroupSeasonTopicProblemRepository,
    private readonly groupSeasonTopicRepository: GroupSeasonTopicRepository,
    private readonly userGroupSeasonTopicProblemService: UserGroupSeasonTopicProblemService,
  ) {
  }

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
        ] = {
        ...userGroupSeasonTopic,
        userGroupSeasonTopicProblems: userGroupSeasonTopicProblems.items.filter(
          u =>
            u.userId === userGroupSeasonTopic.userId &&
            u.groupId === userGroupSeasonTopic.groupId &&
            u.seasonId === userGroupSeasonTopic.seasonId &&
            u.topicId === userGroupSeasonTopic.topicId,
        ),
      }
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
          if (user.groupId)
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
    // Find user with userId and throw NotFoundException if doesn't exist
    // check if user is in the same group as groupId provided if not throw "user not in the group" Error
    // get group from user, and search for GroupSeasonTopic if it doesn't exist,
    // throw NotFoundException "topic hasn't been added to your group"
    // check if the groupSeason the user in is active if not throw "season is not active error"
    // upsert UserGroupSeason
    // TODO: search for group and throw notFoundException if not found,
    // TODO: search for season and throw notFoundException if not found,

    const foundUser = await this.prismaService.user.findUnique({ where: { id: userId } })
    if (!foundUser) throw new NotFoundException(`User with id ${userId} does not exist!`)
    if (foundUser.groupId !== groupId) throw new Error('User is not in this group!')

    const foundGroupSeasonTopic = await this.prismaService.groupSeasonTopic.findUnique({
      where: {
        groupId_seasonId_topicId: { groupId, seasonId, topicId },
      },
      include: { groupSeason: true },
    })
    if (!foundGroupSeasonTopic) throw new Error('Topic is not added to your group yet!')
    if (!foundGroupSeasonTopic.groupSeason.isActive) throw new Error('This group\'s season is not active!')

    const userGSTP = await this.userGroupSeasonTopicRepository.findOne({
      userId_groupId_seasonId_topicId: { userId, groupId, seasonId, topicId },
    })
    await this.userGroupSeasonRepository.upsert({
      where: { userId_groupId_seasonId: { userId, groupId, seasonId } },
      data: {},
    })
    return this.userGroupSeasonTopicRepository.upsert({
      where: {
        userId_groupId_seasonId_topicId: { userId, groupId, seasonId, topicId },
      },
      data: { comfortLevel: userGSTP ? updates.comfortLevel ? updates.comfortLevel : userGSTP.comfortLevel : ComfortLevelEnum.UNCOMFORTABLE },
    })
  }

  async updateUserProblemStatus({ id, ...updates }: UpdateUserGroupSeasonTopicProblemInput) {
    // TODO: search for problem and throw notFoundException if not found,
    // TODO: search for GroupSeasonTopicProblem from the groupId if not found,
    // TODO: throw NotFoundException "problem under this topic hasn't been added to your group yet!"
    const { userId, groupId, seasonId, topicId, problemId } = id

    await this.updateUserTopicComfortability({
      id: { userId, groupId, seasonId, topicId },
    })
    return this.userGroupSeasonTopicProblemRepository.upsert({
      where: {
        userId_groupId_seasonId_topicId_problemId: {
          seasonId,
          topicId,
          groupId,
          problemId,
          userId,
        },
      },
      data: updates,
    })
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
