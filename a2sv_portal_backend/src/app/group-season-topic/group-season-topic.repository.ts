import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { GroupSeasonTopic } from './entities/group-season-topic.entity'
import {
  GroupSeasonTopicProblemIncludeObject,
} from '../group-season-topic-problem/group-season-topic-problem.repository'

export const GroupSeasonTopicIncludeObject = {
  topic: true,
  groupSeasonTopicProblems: {
    include: GroupSeasonTopicProblemIncludeObject,
  },
}

@Injectable()
export class GroupSeasonTopicRepository {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(data: Prisma.GroupSeasonTopicCreateInput): Promise<GroupSeasonTopic> {
    return this.prismaService.groupSeasonTopic.create({
      data,
      include: GroupSeasonTopicIncludeObject,
    })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.GroupSeasonTopicWhereInput
    orderBy?: Prisma.GroupSeasonTopicOrderByWithRelationInput
  }): Promise<GroupSeasonTopic[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.groupSeasonTopic.findMany({
      skip,
      take,
      where,
      orderBy,
      include: GroupSeasonTopicIncludeObject,
    })
  }

  async findOne(where: Prisma.GroupSeasonTopicWhereUniqueInput): Promise<GroupSeasonTopic> {
    return this.prismaService.groupSeasonTopic.findUnique({
      where,
      include: GroupSeasonTopicIncludeObject,
    })
  }

  async update(params: {
    where: Prisma.GroupSeasonTopicWhereUniqueInput
    data: Prisma.GroupSeasonTopicUpdateInput
  }): Promise<GroupSeasonTopic> {
    const { where, data } = params
    return this.prismaService.groupSeasonTopic.update({
      data,
      where,
      include: GroupSeasonTopicIncludeObject,
    })
  }

  async upsert(params: {
    where: Prisma.GroupSeasonTopicWhereUniqueInput
    data: Prisma.GroupSeasonTopicUpdateInput
  }): Promise<GroupSeasonTopic> {
    const { where, data } = params
    return this.prismaService.groupSeasonTopic.upsert({
      where,
      create: {
        groupSeason: {
          connect: {
            groupId_seasonId: {
              groupId: where.groupId_seasonId_topicId.groupId,
              seasonId: where.groupId_seasonId_topicId.seasonId,
            },
          },
        },
        seasonTopic: {
          connect: {
            seasonId_topicId: {
              seasonId: where.groupId_seasonId_topicId.seasonId,
              topicId: where.groupId_seasonId_topicId.topicId,
            },
          },
        },
        topic: { connect: { id: where.groupId_seasonId_topicId.topicId } },
      },
      update: {},
      include: GroupSeasonTopicIncludeObject,
    })
  }

  async remove(where: Prisma.GroupSeasonTopicWhereUniqueInput) {
    return this.prismaService.groupSeasonTopic.delete({ where })
  }
}
