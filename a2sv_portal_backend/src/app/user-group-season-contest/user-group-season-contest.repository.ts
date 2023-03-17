import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { UserGroupSeasonContest } from './entities/user-group-season-contest.entity'
import { UpdateUserGroupSeasonContestInput } from './dto/update-user-group-season-contest.input'

export const UserGroupSeasonContestIncludeObject = {
  contest: {
    include: {
      contestProblems: { include: { problem: { include: { tags: true } } } },
    },
  },
  userGroupSeasonContestProblems: {
    include: {
      contestProblem: { include: { problem: { include: { tags: true } } } },
    },
  },
}

@Injectable()
export class UserGroupSeasonContestRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: Prisma.UserGroupSeasonContestCreateInput,
  ): Promise<UserGroupSeasonContest> {
    return this.prismaService.userGroupSeasonContest.create({
      data,
      include: UserGroupSeasonContestIncludeObject,
    })
  }

  async count(where?: Prisma.UserGroupSeasonContestWhereInput): Promise<number> {
    return this.prismaService.userGroupSeasonContest.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.UserGroupSeasonContestWhereInput
    orderBy?: Prisma.UserGroupSeasonContestOrderByWithRelationInput
  }): Promise<UserGroupSeasonContest[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.userGroupSeasonContest.findMany({
      skip,
      take,
      where,
      orderBy,
      include: UserGroupSeasonContestIncludeObject,
    })
  }

  async findOne(
    where: Prisma.UserGroupSeasonContestWhereUniqueInput,
  ): Promise<UserGroupSeasonContest> {
    return this.prismaService.userGroupSeasonContest.findUnique({
      where,
      include: UserGroupSeasonContestIncludeObject,
    })
  }

  async update(params: {
    where: Prisma.UserGroupSeasonContestWhereUniqueInput
    data: Prisma.UserGroupSeasonContestUpdateInput
  }): Promise<UserGroupSeasonContest> {
    const { where, data } = params
    return this.prismaService.userGroupSeasonContest.update({
      data,
      where,
      include: UserGroupSeasonContestIncludeObject,
    })
  }

  async upsert(params: {
    where: Prisma.UserGroupSeasonContestWhereUniqueInput
    data: UpdateUserGroupSeasonContestInput
  }): Promise<UserGroupSeasonContest> {
    const { where, data } = params
    const { contestAttended, problemsSolved, timeSpent, wrongSubmissions } = data
    const { groupId, seasonId, contestId, userId } = where.userId_groupId_seasonId_contestId
    return this.prismaService.userGroupSeasonContest.upsert({
      where,
      create: {
        contest: { connect: { id: contestId } },
        userGroupSeason: {
          connect: { userId_groupId_seasonId: { seasonId, groupId, userId } },
        },
        groupSeasonContest: {
          connect: { groupId_seasonId_contestId: { groupId, contestId, seasonId } },
        },
        wrongSubmissions,
        contestAttended,
        problemsSolved,
        timeSpent,
      },
      update: {
        wrongSubmissions,
        contestAttended,
        problemsSolved,
        timeSpent,
      },
      include: UserGroupSeasonContestIncludeObject,
    })
  }

  async remove(where: Prisma.UserGroupSeasonContestWhereUniqueInput) {
    return this.prismaService.userGroupSeasonContest.delete({ where })
  }
}
