import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { GroupSeasonContest } from './entities/group-season-contest.entity'
import {
  ContestProblemIncludeObject,
  ContestProblemsIncludeObject,
} from '../contest-problem/contest-problem.repository'

export const GroupSeasonContestIncludeObject = {
  contest: {
    include: ContestProblemsIncludeObject,
  },
  groupSeasonContestProblems: {
    include: {
      userGroupSeasonContestProblems: {
        include: ContestProblemIncludeObject,
      },
      ...ContestProblemIncludeObject,
    },
  },
  userGroupSeasonContests: {
    include: {
      contest: {
        include: ContestProblemsIncludeObject,
      },
      userGroupSeasonContestProblems: {
        include: ContestProblemIncludeObject,
      },
    },
  },
}

@Injectable()
export class GroupSeasonContestRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.GroupSeasonContestCreateInput): Promise<GroupSeasonContest> {
    return this.prismaService.groupSeasonContest.create({
      data,
      include: {
        contest: {
          include: ContestProblemsIncludeObject,
        },
        groupSeasonContestProblems: {
          include: {
            userGroupSeasonContestProblems: {
              include: ContestProblemIncludeObject,
            },
            ...ContestProblemIncludeObject,
          },
        },
        userGroupSeasonContests: {
          include: {
            contest: {
              include: ContestProblemsIncludeObject,
            },
            userGroupSeasonContestProblems: {
              include: ContestProblemIncludeObject,
            },
          },
        },
      },
    })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.GroupSeasonContestWhereInput
    orderBy?: Prisma.GroupSeasonContestOrderByWithRelationInput
  }): Promise<GroupSeasonContest[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.groupSeasonContest.findMany({
      skip,
      take,
      where,
      orderBy,
      include: GroupSeasonContestIncludeObject,
    })
  }

  async findOne(
    where: Prisma.GroupSeasonContestWhereUniqueInput,
  ): Promise<GroupSeasonContest> {
    return this.prismaService.groupSeasonContest.findUnique({
      where,
      include: GroupSeasonContestIncludeObject,
    })
  }

  async update(params: {
    where: Prisma.GroupSeasonContestWhereUniqueInput
    data: Prisma.GroupSeasonContestUpdateInput
  }): Promise<GroupSeasonContest> {
    const { where, data } = params
    return this.prismaService.groupSeasonContest.update({
      data,
      where,
      include: GroupSeasonContestIncludeObject,
    })
  }

  async upsert(params: {
    where: Prisma.GroupSeasonContestWhereUniqueInput
    data: Prisma.GroupSeasonContestUpdateInput
  }): Promise<GroupSeasonContest> {
    const { where, data } = params
    return this.prismaService.groupSeasonContest.upsert({
      where,
      create: {
        groupSeason: {
          connect: {
            groupId_seasonId: {
              groupId: where.groupId_seasonId_contestId.groupId,
              seasonId: where.groupId_seasonId_contestId.seasonId,
            },
          },
        },
        contest: { connect: { id: where.groupId_seasonId_contestId.contestId } },
      },
      update: data,
      include: GroupSeasonContestIncludeObject,
    })
  }

  async remove(where: Prisma.GroupSeasonContestWhereUniqueInput) {
    return this.prismaService.groupSeasonContest.delete({ where })
  }
}
