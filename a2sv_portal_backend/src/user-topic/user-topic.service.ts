import { Injectable } from '@nestjs/common'
import { CreateUserTopicInput } from './dto/create-user-topic.input'
import { UpdateUserTopicInput, UserTopicId } from './dto/update-user-topic.input'
import { PrismaService } from '../prisma/prisma.service'
import { UserTopic } from './entities/user-topic.entity'
import { PaginationInput } from '../common/page/pagination.input'
import { FilterUserTopicInput } from './dto/filter-user-topic-input'
import { PaginationUserTopic } from '../common/page/pagination-info'

@Injectable()
export class UserTopicService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserTopicInput: CreateUserTopicInput): Promise<UserTopic> {
    return this.prismaService.userTopic.create({
      data: createUserTopicInput,
      include: {
        user: true,
        topic: true,
      },
    })
  }

  async findAll(
    filterUserTopicInput: FilterUserTopicInput,
    { take, skip }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationUserTopic> {
    const count = (
      await this.prismaService.userTopic.findMany({
        where: filterUserTopicInput,
      })
    ).length
    const userTopics: UserTopic[] = await this.prismaService.userTopic.findMany({
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

  async findOne(userId: string, topicId: string): Promise<UserTopic> {
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

  async update(updateUserTopicInput: UpdateUserTopicInput): Promise<UserTopic> {
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
