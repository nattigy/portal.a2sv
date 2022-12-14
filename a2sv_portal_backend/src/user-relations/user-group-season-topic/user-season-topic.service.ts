import { Injectable } from '@nestjs/common'
import { UserGroupSeasonTopicId } from './dto/create-user-season-topic.input'
import { UpdateUserGroupSeasonTopicInput } from './dto/update-user-season-topic.input'
import { PrismaService } from '../../prisma/prisma.service'
import { UserGroupSeasonTopic } from './entities/user-season-topic.entity'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterUserGroupSeasonTopicInput } from './dto/filter-user-season-topic-input'
import { PaginationUserGroupSeasonTopic } from '../../common/page/pagination-info'
import { UserGroupSeasonTopicRepository } from './user-season-topic.repository'

@Injectable()
export class UserGroupSeasonTopicService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly UserGroupSeasonTopicRepository: UserGroupSeasonTopicRepository,
  ) {}

  async UserGroupSeasonTopics(
    { groupId, ...filterUserGroupSeasonTopicInput }: FilterUserGroupSeasonTopicInput,
    { take, skip }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationUserGroupSeasonTopic> {
    // TODO: do mapping with groupSeasonTopics
    const count = await this.UserGroupSeasonTopicRepository.count(filterUserGroupSeasonTopicInput)
    const UserGroupSeasonTopics: UserGroupSeasonTopic[] = await this.UserGroupSeasonTopicRepository.findAll({
      skip,
      take,
      where: {
        ...filterUserGroupSeasonTopicInput,
        UserGroupSeason: { user: { groupId } },
      },
    })
    return {
      items: UserGroupSeasonTopics,
      pageInfo: { skip, take, count },
    }
  }

  async UserGroupSeasonTopic({
    userId,
    seasonId,
    topicId,
  }: UserGroupSeasonTopicId): Promise<UserGroupSeasonTopic> {
    // TODO: do mapping with groupSeasonTopic
    return this.UserGroupSeasonTopicRepository.findOne({
      userId_seasonId_topicId: { userId, seasonId, topicId },
    })
  }

  async updateUserGroupSeasonTopic({
    id,
    ...updates
  }: UpdateUserGroupSeasonTopicInput): Promise<UserGroupSeasonTopic> {
    const { userId, seasonId, topicId } = id
    // TODO: get group from user, and search for GroupSeasonTopic if it doesn't exist,
    // TODO: throw NotFoundException "topic hasn't been added to your group"
    // TODO: check if the groupSeason the user in is active if not throw "season is not active error"
    // TODO: upsert UserGroupSeason
    return this.prismaService.UserGroupSeasonTopic.upsert({
      where: {
        userId_seasonId_topicId: { userId, seasonId, topicId },
      },
      create: {
        seasonTopic: {
          connect: {
            seasonId_topicId: { seasonId, topicId },
          },
        },
        UserGroupSeason: {
          connect: { userId_seasonId: { userId, seasonId } },
        },
      },
      update: updates,
      include: {
        seasonTopic: {
          include: {
            season: true,
            topic: true,
            seasonTopicProblems: {
              include: { problem: { include: { tags: true } } },
            },
          },
        },
        UserGroupSeasonTopicProblems: {
          include: {
            problem: { include: { tags: true } },
          },
        },
      },
    })
  }

  async removeUserGroupSeasonTopic({ userId, seasonId, topicId }: UserGroupSeasonTopicId) {
    try {
      await this.UserGroupSeasonTopicRepository.remove({
        userId_seasonId_topicId: { userId, seasonId, topicId },
      })
    } catch (e) {
      console.log(`Fail to delete user topic with id ${userId}`, ' : ', e)
      throw new Error(`Fail to delete user topic with id ${userId}`)
    }
    return 1
  }
}
