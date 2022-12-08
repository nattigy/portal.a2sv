import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { UserSeasonTopic } from './entities/user-season-topic.entity'

@Injectable()
export class UserSeasonTopicRepository {
  constructor(private readonly prismaService: PrismaService,
  ) {
  }

  async create(data: Prisma.UserSeasonTopicCreateInput): Promise<UserSeasonTopic> {
    return this.prismaService.userSeasonTopic.create({
      data,
      include: {
        seasonTopic: {
          include: {
            season: true, topic: true,
            seasonTopicProblems: {
              include: { problem: { include: { tags: true } } },
            },
          },
        },
        userSeason: {
          include: { user: true, season: true },
        },
        userSeasonTopicProblems: {
          include: {
            problem: { include: { tags: true } },
          },
        },
      },
    })
  }

  async count(where?: Prisma.UserSeasonTopicWhereInput): Promise<number> {
    return this.prismaService.userSeasonTopic.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserSeasonTopicWhereUniqueInput
    where?: Prisma.UserSeasonTopicWhereInput
    orderBy?: Prisma.UserSeasonTopicOrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.userSeasonTopic.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        seasonTopic: {
          include: {
            season: true, topic: true,
            seasonTopicProblems: {
              include: { problem: { include: { tags: true } } },
            },
          },
        },
        userSeason: {
          include: { user: true, season: true },
        },
        userSeasonTopicProblems: {
          include: {
            problem: { include: { tags: true } },
          },
        },
      },
    })
  }

  async findOne(where: Prisma.UserSeasonTopicWhereUniqueInput) {
    return this.prismaService.userSeasonTopic.findUnique({
      where,
      include: {
        seasonTopic: {
          include: {
            season: true, topic: true,
            seasonTopicProblems: {
              include: { problem: { include: { tags: true } } },
            },
          },
        },
        userSeason: {
          include: { user: true, season: true },
        },
        userSeasonTopicProblems: {
          include: {
            problem: { include: { tags: true } },
          },
        },
      },
    })
  }

  async update(params: {
    where: Prisma.UserSeasonTopicWhereUniqueInput
    data: Prisma.UserSeasonTopicUpdateInput
  }) {
    const { where, data } = params
    return this.prismaService.userSeasonTopic.update({
      data, where,
      include: {
        seasonTopic: {
          include: {
            season: true, topic: true,
            seasonTopicProblems: {
              include: { problem: { include: { tags: true } } },
            },
          },
        },
        userSeason: {
          include: { user: true, season: true },
        },
        userSeasonTopicProblems: {
          include: {
            problem: { include: { tags: true } },
          },
        },
      },
    })
  }

  async remove(where: Prisma.UserSeasonTopicWhereUniqueInput) {
    return this.prismaService.userSeasonTopic.delete({ where })
  }
}
