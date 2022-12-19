import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { GroupSeasonTopicProblem } from './entities/group-season-topic-problem.entity'
import { GroupSeasonTopic } from '../group-season-topic/entities/group-season-topic.entity'

@Injectable()
export class GroupSeasonTopicProblemRepository {
  include = {
    userGroupSeasonTopicProblems: {
      include: {
        problem: { include: { tags: true } },
      },
    },
    problem: { include: { tags: true } },
  }

  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: Prisma.GroupSeasonTopicProblemCreateInput,
  ): Promise<GroupSeasonTopicProblem> {
    return this.prismaService.groupSeasonTopicProblem.create({
      data,
      include: this.include,
    })
  }

  async count(where?: Prisma.GroupSeasonTopicProblemWhereInput): Promise<number> {
    return this.prismaService.groupSeasonTopicProblem.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.GroupSeasonTopicProblemWhereInput
    orderBy?: Prisma.GroupSeasonTopicProblemOrderByWithRelationInput
  }): Promise<GroupSeasonTopicProblem[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.groupSeasonTopicProblem.findMany({
      skip,
      take,
      where,
      orderBy,
      include: this.include,
    })
  }

  async findOne(
    where: Prisma.GroupSeasonTopicProblemWhereUniqueInput,
  ): Promise<GroupSeasonTopicProblem> {
    return this.prismaService.groupSeasonTopicProblem.findUnique({
      where,
      include: this.include,
    })
  }

  async update(params: {
    where: Prisma.GroupSeasonTopicProblemWhereUniqueInput
    data: Prisma.GroupSeasonTopicProblemUpdateInput
  }): Promise<GroupSeasonTopicProblem> {
    const { where, data } = params
    return this.prismaService.groupSeasonTopicProblem.update({
      data,
      where,
      include: this.include,
    })
  }

  async upsert(params: {
    where: Prisma.GroupSeasonTopicProblemWhereUniqueInput
    data: Prisma.GroupSeasonTopicProblemUpdateInput
  }): Promise<GroupSeasonTopicProblem> {
    const { where, data } = params
    return this.prismaService.groupSeasonTopicProblem.upsert({
      where,
      create: {
        groupSeasonTopic: {
          connect: {
            groupId_seasonId_topicId: {
              groupId: where.groupId_seasonId_topicId_problemId.groupId,
              seasonId: where.groupId_seasonId_topicId_problemId.seasonId,
              topicId: where.groupId_seasonId_topicId_problemId.topicId,
            },
          },
        },
        seasonTopicProblem: {
          connect: {
            seasonId_topicId_problemId: {
              seasonId: where.groupId_seasonId_topicId_problemId.seasonId,
              topicId: where.groupId_seasonId_topicId_problemId.topicId,
              problemId: where.groupId_seasonId_topicId_problemId.problemId,
            },
          },
        },
        problem: { connect: { id: where.groupId_seasonId_topicId_problemId.problemId } },
      },
      update: {},
      include: this.include,
    })
  }

  async remove(where: Prisma.GroupSeasonTopicProblemWhereUniqueInput) {
    return this.prismaService.groupSeasonTopicProblem.delete({ where })
  }
}
