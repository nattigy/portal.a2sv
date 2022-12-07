import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { GroupSeasonTopic } from './entities/group-season-topic.entity'

@Injectable()
export class GroupSeasonTopicRepository {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(data: Prisma.GroupSeasonTopicCreateInput | Prisma.GroupSeasonTopicUncheckedCreateInput): Promise<GroupSeasonTopic> {
    return this.prismaService.groupSeasonTopic.create({
      data,
      include: {
        group: true,
        seasonTopic: {
          include: {
            season: true,
            topic: true,
            seasonTopicProblems: {
              include: { problem: { include: { tags: true } } },
            },
          },
        },
        groupSeasonTopicProblems: {
          include: {
            problem: { include: { tags: true } },
          },
        },
      },
    })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.GroupSeasonTopicWhereUniqueInput
    where?: Prisma.GroupSeasonTopicWhereInput
    orderBy?: Prisma.GroupSeasonTopicOrderByWithRelationInput
  }): Promise<GroupSeasonTopic[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.groupSeasonTopic.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        group: true,
        seasonTopic: {
          include: {
            season: true,
            topic: true,
            seasonTopicProblems: {
              include: { problem: { include: { tags: true } } },
            },
          },
        },
        groupSeasonTopicProblems: {
          include: {
            problem: { include: { tags: true } },
          },
        },
      },
    })
  }

  async findOne(where: Prisma.GroupSeasonTopicWhereUniqueInput): Promise<GroupSeasonTopic> {
    return this.prismaService.groupSeasonTopic.findUnique({
      where,
      include: {
        group: true,
        seasonTopic: {
          include: {
            season: true,
            topic: true,
            seasonTopicProblems: {
              include: { problem: { include: { tags: true } } },
            },
          },
        },
        groupSeasonTopicProblems: {
          include: {
            problem: { include: { tags: true } },
          },
        },
      },
    })
  }

  async update(params: {
    where: Prisma.GroupSeasonTopicWhereUniqueInput
    data: Prisma.GroupSeasonTopicUpdateInput
  }): Promise<GroupSeasonTopic> {
    const { where, data } = params
    return this.prismaService.groupSeasonTopic.update({
      data, where,
      include: {
        group: true,
        seasonTopic: {
          include: {
            season: true,
            topic: true,
            seasonTopicProblems: {
              include: { problem: { include: { tags: true } } },
            },
          },
        },
        groupSeasonTopicProblems: {
          include: {
            problem: { include: { tags: true } },
          },
        },
      },
    })
  }

  async remove(where: Prisma.GroupSeasonTopicWhereUniqueInput) {
    return this.prismaService.groupSeasonTopic.delete({ where })
  }
}
