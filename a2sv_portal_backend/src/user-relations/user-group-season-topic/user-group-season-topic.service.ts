import { Injectable } from '@nestjs/common'
import { UserGroupSeasonTopicId } from './dto/create-user-group-season-topic.input'
import { UpdateUserGroupSeasonTopicInput } from './dto/update-user-group-season-topic.input'
import { PrismaService } from '../../prisma/prisma.service'
import { UserGroupSeasonTopic } from './entities/user-group-season-topic.entity'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterUserGroupSeasonTopicInput } from './dto/filter-user-group-season-topic-input'
import { PaginationUserGroupSeasonTopic } from '../../common/page/pagination-info'
import { UserGroupSeasonTopicRepository } from './user-group-season-topic.repository'

@Injectable()
export class UserGroupSeasonTopicService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userGroupSeasonTopicRepository: UserGroupSeasonTopicRepository,
  ) {
  }

  async userGroupSeasonTopics(
    { groupId, ...filterUserGroupSeasonTopicInput }: FilterUserGroupSeasonTopicInput,
    { take, skip }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationUserGroupSeasonTopic> {
    // TODO: do mapping with groupSeasonTopics
    const count = await this.userGroupSeasonTopicRepository.count(filterUserGroupSeasonTopicInput)
    const UserGroupSeasonTopics: UserGroupSeasonTopic[] = await this.userGroupSeasonTopicRepository.findAll({
      skip,
      take,
      where: filterUserGroupSeasonTopicInput,
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
    return this.userGroupSeasonTopicRepository.findOne({
      userId_groupId_seasonId_topicId: { userId, groupId, seasonId, topicId },
    })
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
