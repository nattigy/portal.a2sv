import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { UserGroupSeasonTopic } from './entities/user-group-season-topic.entity'
import { UpdateUserGroupSeasonTopicInput } from './dto/update-user-group-season-topic.input'

@Injectable()
export class UserGroupSeasonTopicRepository {
  include = {
    topic: true,
    userGroupSeasonTopicProblems: {
      include: {
        problem: { include: { tags: true } },
      },
    },
  }

  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserGroupSeasonTopicCreateInput): Promise<UserGroupSeasonTopic> {
    return this.prismaService.userGroupSeasonTopic.create({
      data,
      include: this.include,
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
      include: this.include,
    })
  }

  async findOne(
    where: Prisma.UserGroupSeasonTopicWhereUniqueInput,
  ): Promise<UserGroupSeasonTopic> {
    return this.prismaService.userGroupSeasonTopic.findUnique({
      where,
      include: this.include,
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
      include: this.include,
    })
  }

  async upsert(params: {
    where: Prisma.UserGroupSeasonTopicWhereUniqueInput
    data: UpdateUserGroupSeasonTopicInput
    // data: Prisma.UserGroupSeasonTopicUpdateInput
  }): Promise<UserGroupSeasonTopic> {
    const { where, data } = params
    const { comfortLevel } = data
    return this.prismaService.userGroupSeasonTopic.upsert({
      where,
      create: {
        comfortLevel,
        // comfortLevel: data.comfortLevel === ComfortLevelEnum.COMFORTABLE ? 'COMFORTABLE' : 'UNCOMFORTABLE',
        userGroupSeason: {
          connectOrCreate: {
            where: {
              userId_groupId_seasonId: {
                userId: where.userId_groupId_seasonId_topicId.userId,
                groupId: where.userId_groupId_seasonId_topicId.groupId,
                seasonId: where.userId_groupId_seasonId_topicId.seasonId,
              },
            },
            create: {
              userId: where.userId_groupId_seasonId_topicId.userId,
              groupId: where.userId_groupId_seasonId_topicId.groupId,
              seasonId: where.userId_groupId_seasonId_topicId.seasonId,
            }
          },
        },
        groupSeasonTopic: {
          connect: {
            groupId_seasonId_topicId: {
              groupId: where.userId_groupId_seasonId_topicId.groupId,
              seasonId: where.userId_groupId_seasonId_topicId.seasonId,
              topicId: where.userId_groupId_seasonId_topicId.topicId,
            },
          },
        },
        topic: {
          connect: { id: where.userId_groupId_seasonId_topicId.topicId },
        },
      },
      update: { comfortLevel },
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

  async remove(where: Prisma.UserGroupSeasonTopicWhereUniqueInput) {
    return this.prismaService.userGroupSeasonTopic.delete({ where })
  }
}
