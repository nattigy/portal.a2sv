import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { GroupSeasonTopicProblem } from './entities/group-season-topic-problem.entity'
import { ProblemIncludeObject } from '../problem/problem.repository'

export const GroupSeasonTopicProblemIncludeObject = {
  userGroupSeasonTopicProblems: {
    include: {
      problem: { include: ProblemIncludeObject },
    },
  },
  problem: { include: ProblemIncludeObject },
}

@Injectable()
export class GroupSeasonTopicProblemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: Prisma.GroupSeasonTopicProblemCreateInput,
  ): Promise<GroupSeasonTopicProblem> {
    return this.prismaService.groupSeasonTopicProblem.create({
      data,
      include: GroupSeasonTopicProblemIncludeObject,
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
      include: GroupSeasonTopicProblemIncludeObject,
    })
  }

  async findOne(
    where: Prisma.GroupSeasonTopicProblemWhereUniqueInput,
  ): Promise<GroupSeasonTopicProblem> {
    return this.prismaService.groupSeasonTopicProblem.findUnique({
      where,
      include: GroupSeasonTopicProblemIncludeObject,
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
      include: GroupSeasonTopicProblemIncludeObject,
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
          connectOrCreate: {
            where: {
              seasonId_topicId_problemId: {
                seasonId: where.groupId_seasonId_topicId_problemId.seasonId,
                topicId: where.groupId_seasonId_topicId_problemId.topicId,
                problemId: where.groupId_seasonId_topicId_problemId.problemId,
              },
            },
            create: {
              seasonTopic: {
                connectOrCreate: {
                  where: {
                    seasonId_topicId: {
                      seasonId: where.groupId_seasonId_topicId_problemId.seasonId,
                      topicId: where.groupId_seasonId_topicId_problemId.topicId,
                    },
                  },
                  create: {
                    seasonId: where.groupId_seasonId_topicId_problemId.seasonId,
                    topicId: where.groupId_seasonId_topicId_problemId.topicId,
                  },
                },
              },
              problem: {
                connect: {
                  id: where.groupId_seasonId_topicId_problemId.problemId,
                },
              },
            },
          },
        },
        problem: { connect: { id: where.groupId_seasonId_topicId_problemId.problemId } },
      },
      update: {},
      include: GroupSeasonTopicProblemIncludeObject,
    })
  }

  async remove(where: Prisma.GroupSeasonTopicProblemWhereUniqueInput) {
    return this.prismaService.groupSeasonTopicProblem.delete({ where })
  }
}
