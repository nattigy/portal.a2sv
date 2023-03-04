import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { UserGroupSeasonTopicProblem } from './entities/user-group-season-topic-problem.entity'
import { UpdateUserGroupSeasonTopicProblemInput } from './dto/update-user-group-season-topic-problem.input'
import { ProblemIncludeObject } from '../problem/problem.repository'

export const UserGroupSeasonTopicProblemIncludeObject = {
  problem: { include: ProblemIncludeObject },
}

@Injectable()
export class UserGroupSeasonTopicProblemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: Prisma.UserGroupSeasonTopicProblemCreateInput,
  ): Promise<UserGroupSeasonTopicProblem> {
    return this.prismaService.userGroupSeasonTopicProblem.create({
      data,
      include: UserGroupSeasonTopicProblemIncludeObject,
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
      include: UserGroupSeasonTopicProblemIncludeObject,
    })
  }

  async findOne(
    where: Prisma.UserGroupSeasonTopicProblemWhereUniqueInput,
  ): Promise<UserGroupSeasonTopicProblem> {
    return this.prismaService.userGroupSeasonTopicProblem.findUnique({
      where,
      include: UserGroupSeasonTopicProblemIncludeObject,
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
      include: UserGroupSeasonTopicProblemIncludeObject,
    })
  }

  async upsert(params: {
    where: Prisma.UserGroupSeasonTopicProblemWhereUniqueInput
    data: UpdateUserGroupSeasonTopicProblemInput
  }): Promise<UserGroupSeasonTopicProblem> {
    const { where, data } = params
    const { id, ...updates } = data
    const { userId, groupId, seasonId, topicId, problemId } =
      where.userId_groupId_seasonId_topicId_problemId
    return this.prismaService.userGroupSeasonTopicProblem.upsert({
      where,
      create: {
        ...updates,
        userGroupSeasonTopic: {
          connectOrCreate: {
            where: { userId_groupId_seasonId_topicId: { seasonId, topicId, groupId, userId } },
            create: { seasonId, topicId, groupId, userId },
          },
        },
        groupSeasonTopicProblem: {
          connect: {
            groupId_seasonId_topicId_problemId: { seasonId, topicId, groupId, problemId },
          },
        },
        problem: { connect: { id: problemId } },
      },
      update: updates,
      include: UserGroupSeasonTopicProblemIncludeObject,
    })
  }

  async remove(where: Prisma.UserGroupSeasonTopicProblemWhereUniqueInput) {
    return this.prismaService.userGroupSeasonTopicProblem.delete({ where })
  }
}
