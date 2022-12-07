import { Injectable } from '@nestjs/common'
import { CreateUserSeasonTopicInput } from './dto/create-user-season-topic.input'
import { UpdateUserSeasonTopicInput, UserTopicId } from './dto/update-user-season-topic.input'
import { PrismaService } from '../../prisma/prisma.service'
import { UserSeasonTopic } from './entities/user-season-topic.entity'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterUserSeasonTopicInput } from './dto/filter-user-season-topic-input'
import { PaginationUserSeasonTopic } from '../../common/page/pagination-info'

@Injectable()
export class UserSeasonTopicService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserTopicInput: CreateUserSeasonTopicInput): Promise<UserSeasonTopic> {
    return this.prismaService.userTopic.create({
      data: createUserTopicInput,
      include: {
        user: true,
        topic: true,
      },
    })
  }

  async findAll(
    filterUserTopicInput: FilterUserSeasonTopicInput,
    { take, skip }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationUserSeasonTopic> {
    const count = (
      await this.prismaService.userTopic.findMany({
        where: filterUserTopicInput,
      })
    ).length
    const userTopics: UserSeasonTopic[] = await this.prismaService.userTopic.findMany({
      where: filterUserTopicInput,
      include: {
        user: true,
        topic: true,
      },
    })
    return {
      items: userTopics,
      pageInfo: {
        skip,
        take,
        count,
      },
    }
  }

  async findOne(userId: string, topicId: string): Promise<UserSeasonTopic> {
    return this.prismaService.userTopic.findUnique({
      where: {
        userId_topicId: {
          userId,
          topicId,
        },
      },
      include: {
        user: true,
        topic: true,
      },
    })
  }

  async update(updateUserTopicInput: UpdateUserSeasonTopicInput): Promise<UserSeasonTopic> {
    return this.prismaService.userTopic.update({
      where: {
        userId_topicId: {
          userId: updateUserTopicInput.userId,
          topicId: updateUserTopicInput.topicId,
        },
      },
      data: updateUserTopicInput,
      include: {
        user: true,
        topic: true,
      },
    })
  }

  async remove({ userId, topicId }: UserTopicId) {
    try {
      await this.prismaService.userTopic.delete({
        where: {
          userId_topicId: {
            userId,
            topicId,
          },
        },
      })
    } catch (e) {
      console.log(`Fail to delete user topic with id ${userId}`, ' : ', e)
      throw new Error(`Fail to delete user topic with id ${userId}`)
    }
    return 1
  }
}
