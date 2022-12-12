import { Injectable } from '@nestjs/common'
import { UserSeasonTopicId } from './dto/create-user-season-topic.input'
import { UpdateUserSeasonTopicInput } from './dto/update-user-season-topic.input'
import { PrismaService } from '../../prisma/prisma.service'
import { UserSeasonTopic } from './entities/user-season-topic.entity'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterUserSeasonTopicInput } from './dto/filter-user-season-topic-input'
import { PaginationUserSeasonTopic } from '../../common/page/pagination-info'
import { UserSeasonTopicRepository } from './user-season-topic.repository'

@Injectable()
export class UserSeasonTopicService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userSeasonTopicRepository: UserSeasonTopicRepository,
  ) {}

  async userSeasonTopics(
    { groupId, ...filterUserSeasonTopicInput }: FilterUserSeasonTopicInput,
    { take, skip }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationUserSeasonTopic> {
    // TODO: do mapping with groupSeasonTopics
    const count = await this.userSeasonTopicRepository.count(filterUserSeasonTopicInput)
    const userSeasonTopics: UserSeasonTopic[] = await this.userSeasonTopicRepository.findAll({
      skip,
      take,
      where: {
        ...filterUserSeasonTopicInput,
        userSeason: { user: { groupId } },
      },
    })
    return {
      items: userSeasonTopics,
      pageInfo: { skip, take, count },
    }
  }

  async userSeasonTopic({
    userId,
    seasonId,
    topicId,
  }: UserSeasonTopicId): Promise<UserSeasonTopic> {
    // TODO: do mapping with groupSeasonTopic
    return this.userSeasonTopicRepository.findOne({
      userId_seasonId_topicId: { userId, seasonId, topicId },
    })
  }

  async updateUserSeasonTopic({
    id,
    ...updates
  }: UpdateUserSeasonTopicInput): Promise<UserSeasonTopic> {
    const { userId, seasonId, topicId } = id
    // TODO: get group from user, and search for GroupSeasonTopic if it doesn't exist,
    // TODO: throw NotFoundException "topic hasn't been added to your group"
    // TODO: check if the groupSeason the user in is active if not throw "season is not active error"
    // TODO: upsert userSeason
    return this.prismaService.userSeasonTopic.upsert({
      where: {
        userId_seasonId_topicId: { userId, seasonId, topicId },
      },
      create: {
        seasonTopic: {
          connect: {
            seasonId_topicId: { seasonId, topicId },
          },
        },
        userSeason: {
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
        userSeasonTopicProblems: {
          include: {
            problem: { include: { tags: true } },
          },
        },
      },
    })
  }

  async removeUserSeasonTopic({ userId, seasonId, topicId }: UserSeasonTopicId) {
    try {
      await this.userSeasonTopicRepository.remove({
        userId_seasonId_topicId: { userId, seasonId, topicId },
      })
    } catch (e) {
      console.log(`Fail to delete user topic with id ${userId}`, ' : ', e)
      throw new Error(`Fail to delete user topic with id ${userId}`)
    }
    return 1
  }
}
