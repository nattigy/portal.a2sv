import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { UserGroupSeasonTopicProblem } from './entities/user-group-season-topic-problem.entity'
import { UpdateUserGroupSeasonTopicProblemInput } from './dto/update-user-group-season-topic-problem.input'

@Injectable()
export class UserGroupSeasonTopicProblemRepository {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(
    data: Prisma.UserGroupSeasonTopicProblemCreateInput,
  ): Promise<UserGroupSeasonTopicProblem> {
    return this.prismaService.userGroupSeasonTopicProblem.create({
      data,
      include: {
        problem: { include: { tags: true } },
      },
    })
  }

  async count(where?: Prisma.UserGroupSeasonTopicProblemWhereInput): Promise<number> {
    return this.prismaService.userGroupSeasonTopicProblem.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.UserGroupSeasonTopicProblemWhereInput
    orderBy?: Prisma.UserGroupSeasonTopicProblemOrderByWithRelationInput
  }): Promise<UserGroupSeasonTopicProblem[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.userGroupSeasonTopicProblem.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        problem: { include: { tags: true } },
      },
    })
  }

  async findOne(
    where: Prisma.UserGroupSeasonTopicProblemWhereUniqueInput,
  ): Promise<UserGroupSeasonTopicProblem> {
    return this.prismaService.userGroupSeasonTopicProblem.findUnique({
      where,
      include: {
        problem: { include: { tags: true } },
      },
    })
  }

  async update(params: {
    where: Prisma.UserGroupSeasonTopicProblemWhereUniqueInput
    data: Prisma.UserGroupSeasonTopicProblemUpdateInput
  }): Promise<UserGroupSeasonTopicProblem> {
    const { where, data } = params
    return this.prismaService.userGroupSeasonTopicProblem.update({
      data,
      where,
      include: {
        problem: { include: { tags: true } },
      },
    })
  }

  async upsert(params: {
    where: Prisma.UserGroupSeasonTopicProblemWhereUniqueInput
    data: UpdateUserGroupSeasonTopicProblemInput
  }): Promise<UserGroupSeasonTopicProblem> {
    const { where, data } = params
    const { solutionLink, numberOfAttempts, numberOfMinutes, status } = data
    return this.prismaService.userGroupSeasonTopicProblem.upsert({
      where,
      create: {
        solutionLink,
        numberOfAttempts,
        numberOfMinutes,
        status,
        userGroupSeasonTopic: {
          connect: {
            userId_groupId_seasonId_topicId: {
              seasonId: where.userId_groupId_seasonId_topicId_problemId.seasonId,
              topicId: where.userId_groupId_seasonId_topicId_problemId.topicId,
              groupId: where.userId_groupId_seasonId_topicId_problemId.groupId,
              userId: where.userId_groupId_seasonId_topicId_problemId.userId,
            },
          },
        },
        groupSeasonTopicProblem: {
          connect: {
            groupId_seasonId_topicId_problemId: {
              seasonId: where.userId_groupId_seasonId_topicId_problemId.seasonId,
              topicId: where.userId_groupId_seasonId_topicId_problemId.topicId,
              groupId: where.userId_groupId_seasonId_topicId_problemId.groupId,
              problemId: where.userId_groupId_seasonId_topicId_problemId.problemId,
            },
          },
        },
        problem: {
          connect: { id: where.userId_groupId_seasonId_topicId_problemId.problemId },
        },
      },
      update: {
        solutionLink,
        numberOfAttempts,
        numberOfMinutes,
        status,
      },
      include: {
        problem: { include: { tags: true } },
      },
    })
  }

  async remove(where: Prisma.UserGroupSeasonTopicProblemWhereUniqueInput) {
    return this.prismaService.userGroupSeasonTopicProblem.delete({ where })
  }
}
