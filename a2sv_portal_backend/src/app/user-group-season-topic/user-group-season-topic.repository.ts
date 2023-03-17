import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { UserGroupSeasonTopic } from './entities/user-group-season-topic.entity'
import { UpdateUserGroupSeasonTopicInput } from './dto/update-user-group-season-topic.input'
import { UserGroupSeasonTopicProblemIncludeObject } from '../user-group-season-topic-problem/user-group-season-topic-problem.repository'

export const UserGroupSeasonTopicIncludeObject = {
  topic: true,
  userGroupSeasonTopicProblems: {
    include: UserGroupSeasonTopicProblemIncludeObject,
  },
}

@Injectable()
export class UserGroupSeasonTopicRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserGroupSeasonTopicCreateInput): Promise<UserGroupSeasonTopic> {
    return this.prismaService.userGroupSeasonTopic.create({
      data,
      include: UserGroupSeasonTopicIncludeObject,
    })
  }

  async count(where?: Prisma.UserGroupSeasonTopicWhereInput): Promise<number> {
    return this.prismaService.userGroupSeasonTopic.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.UserGroupSeasonTopicWhereInput
    orderBy?: Prisma.UserGroupSeasonTopicOrderByWithRelationInput
  }): Promise<UserGroupSeasonTopic[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.userGroupSeasonTopic.findMany({
      skip,
      take,
      where,
      orderBy,
      include: UserGroupSeasonTopicIncludeObject,
    })
  }

  async findOne(
    where: Prisma.UserGroupSeasonTopicWhereUniqueInput,
  ): Promise<UserGroupSeasonTopic> {
    return this.prismaService.userGroupSeasonTopic.findUnique({
      where,
      include: UserGroupSeasonTopicIncludeObject,
    })
  }

  async update(params: {
    where: Prisma.UserGroupSeasonTopicWhereUniqueInput
    data: Prisma.UserGroupSeasonTopicUpdateInput
  }): Promise<UserGroupSeasonTopic> {
    const { where, data } = params
    return this.prismaService.userGroupSeasonTopic.update({
      data,
      where,
      include: UserGroupSeasonTopicIncludeObject,
    })
  }

  async upsert(params: {
    where: Prisma.UserGroupSeasonTopicWhereUniqueInput
    data: UpdateUserGroupSeasonTopicInput
  }): Promise<UserGroupSeasonTopic> {
    const { where, data } = params
    const { comfortLevel } = data
    const { userId, groupId, seasonId, topicId } = where.userId_groupId_seasonId_topicId
    return this.prismaService.userGroupSeasonTopic.upsert({
      where,
      create: {
        comfortLevel,
        userGroupSeason: {
          connectOrCreate: {
            where: {
              userId_groupId_seasonId: { userId, groupId, seasonId },
            },
            create: { userId, groupId, seasonId },
          },
        },
        groupSeasonTopic: {
          connect: {
            groupId_seasonId_topicId: { groupId, seasonId, topicId },
          },
        },
        topic: {
          connect: { id: topicId },
        },
      },
      update: { comfortLevel },
      include: UserGroupSeasonTopicIncludeObject,
    })
  }

  async remove(where: Prisma.UserGroupSeasonTopicWhereUniqueInput) {
    return this.prismaService.userGroupSeasonTopic.delete({ where })
  }
}
