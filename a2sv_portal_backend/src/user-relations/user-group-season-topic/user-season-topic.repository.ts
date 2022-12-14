import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { UserGroupSeasonTopic } from './entities/user-season-topic.entity'

@Injectable()
export class UserGroupSeasonTopicRepository {
  include = {
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
  }

  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserGroupSeasonTopicCreateInput): Promise<UserGroupSeasonTopic> {
    return this.prismaService.UserGroupSeasonTopic.create({
      data,
      include: this.include,
    })
  }

  async count(where?: Prisma.UserGroupSeasonTopicWhereInput): Promise<number> {
    return this.prismaService.UserGroupSeasonTopic.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserGroupSeasonTopicWhereUniqueInput
    where?: Prisma.UserGroupSeasonTopicWhereInput
    orderBy?: Prisma.UserGroupSeasonTopicOrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.UserGroupSeasonTopic.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: this.include,
    })
  }

  async findOne(where: Prisma.UserGroupSeasonTopicWhereUniqueInput) {
    return this.prismaService.UserGroupSeasonTopic.findUnique({
      where,
      include: this.include,
    })
  }

  async update(params: {
    where: Prisma.UserGroupSeasonTopicWhereUniqueInput
    data: Prisma.UserGroupSeasonTopicUpdateInput
  }) {
    const { where, data } = params
    return this.prismaService.UserGroupSeasonTopic.update({
      data,
      where,
      include: this.include,
    })
  }

  async remove(where: Prisma.UserGroupSeasonTopicWhereUniqueInput) {
    return this.prismaService.UserGroupSeasonTopic.delete({ where })
  }
}
