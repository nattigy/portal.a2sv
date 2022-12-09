import { Injectable } from '@nestjs/common'
import { CreateUserSeasonTopicInput, UserSeasonTopicId } from './dto/create-user-season-topic.input'
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
  ) {
  }

  async createUserSeasonTopic({
                                userId,
                                seasonId,
                                topicId,
                              }: CreateUserSeasonTopicInput): Promise<UserSeasonTopic> {
    return this.userSeasonTopicRepository.create({
      seasonTopic: {
        connect: {
          seasonId_topicId: { seasonId, topicId },
        },
      },
      userSeason: {
        connect: { userId_seasonId: { userId, seasonId } },
      },
    })
  }

  async userSeasonTopics(
    filterUserSeasonTopicInput: FilterUserSeasonTopicInput,
    { take, skip }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationUserSeasonTopic> {
    const count = await this.userSeasonTopicRepository.count(filterUserSeasonTopicInput)
    const userSeasonTopics: UserSeasonTopic[] = await this.userSeasonTopicRepository.findAll({
      skip,
      take,
      where: filterUserSeasonTopicInput,
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
    return this.userSeasonTopicRepository.findOne({
      userId_seasonId_topicId: {
        userId,
        seasonId,
        topicId,
      },
    })
  }

  async updateUserSeasonTopic({
                                id,
                                ...updates
                              }: UpdateUserSeasonTopicInput): Promise<UserSeasonTopic> {
    const { userId, seasonId, topicId } = id
    return this.userSeasonTopicRepository.update({
      where: {
        userId_seasonId_topicId: { userId, seasonId, topicId },
      },
      data: updates,
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
