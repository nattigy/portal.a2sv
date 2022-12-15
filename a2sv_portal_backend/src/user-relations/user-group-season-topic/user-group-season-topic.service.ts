import { Injectable } from '@nestjs/common'
import { UserGroupSeasonTopicId } from './dto/create-user-group-season-topic.input'
import { UpdateUserGroupSeasonTopicInput } from './dto/update-user-group-season-topic.input'
import { PrismaService } from '../../prisma/prisma.service'
import { UserGroupSeasonTopic } from './entities/user-group-season-topic.entity'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterUserGroupSeasonTopicInput } from './dto/filter-user-group-season-topic-input'
import { PaginationUserGroupSeasonTopic } from '../../common/page/pagination-info'
import { UserGroupSeasonTopicRepository } from './user-group-season-topic.repository'
import {
  UserGroupSeasonTopicProblemService,
} from '../user-group-season-topic-problem/user-group-season-topic-problem.service'
import {
  UpdateUserGroupSeasonTopicProblemInput,
} from '../user-group-season-topic-problem/dto/update-user-group-season-topic-problem.input'

@Injectable()
export class UserGroupSeasonTopicService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userGroupSeasonTopicRepository: UserGroupSeasonTopicRepository,
    private readonly userGroupSeasonTopicProblemService: UserGroupSeasonTopicProblemService,
  ) {
  }

  async userGroupSeasonTopics(
    { ...filterUserGroupSeasonTopicInput }: FilterUserGroupSeasonTopicInput,
    { take, skip }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationUserGroupSeasonTopic> {
    // TODO: do mapping with groupSeasonTopics
    const count = await this.userGroupSeasonTopicRepository.count(filterUserGroupSeasonTopicInput)
    const UserGroupSeasonTopics: UserGroupSeasonTopic[] = await this.userGroupSeasonTopicRepository.findAll({
      skip,
      take,
      where: filterUserGroupSeasonTopicInput,
    })
    const userGroupSeasonTopicProblems = await this.userGroupSeasonTopicProblemService.userGroupSeasonTopicProblems({
      ...filterUserGroupSeasonTopicInput,
    })
    return {
      items: UserGroupSeasonTopics,
      pageInfo: { skip, take, count },
    }
  }

  async userGroupSeasonTopic(
    { userId, groupId, seasonId, topicId }: UserGroupSeasonTopicId,
  ): Promise<UserGroupSeasonTopic> {
    // TODO: do mapping with groupSeasonTopic
    const userGroupSeasonTopic = await this.userGroupSeasonTopicRepository.findOne({
      userId_groupId_seasonId_topicId: { userId, groupId, seasonId, topicId },
    })
    const userGroupSeasonTopicProblems =
      await this.userGroupSeasonTopicProblemService.userGroupSeasonTopicProblems({
        userId, groupId, seasonId, topicId,
      })
    userGroupSeasonTopic.userGroupSeasonTopicProblems = userGroupSeasonTopicProblems.items
    return userGroupSeasonTopic
  }

  async updateUserGroupSeasonTopic(
    { id, ...updates }: UpdateUserGroupSeasonTopicInput,
  ): Promise<UserGroupSeasonTopic> {
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
      },
      update: updates,
      include: {
        userGroupSeasonTopicProblems: {
          include: {
            problem: { include: { tags: true } },
          },
        },
      },
    })
  }

  async updateUserGroupSeasonTopicProblem(updateUserGroupSeasonTopicProblemInput: UpdateUserGroupSeasonTopicProblemInput) {
    // TODO: get group from the user,
    // TODO: search for GroupSeasonTopicProblem from the groupId if not found,
    // TODO: throw NotFoundException "problem under this topic hasn't been added to your group"
    // TODO: check if the groupSeason the user in is active if not throw "season is not active error"
    // TODO: upsert UserGroupSeason and then UserGroupSeasonTopic
    return this.userGroupSeasonTopicProblemService.updateUserGroupSeasonTopicProblem(updateUserGroupSeasonTopicProblemInput)
  }

  async removeUserGroupSeasonTopic(
    { userId, groupId, seasonId, topicId }: UserGroupSeasonTopicId,
  ) {
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
