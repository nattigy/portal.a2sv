import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { UserGroupSeasonContest } from './entities/user-season-contest.entity'

@Injectable()
export class UserGroupSeasonContestRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserGroupSeasonContestCreateInput): Promise<UserGroupSeasonContest> {
    return this.prismaService.UserGroupSeasonContest.create({
      data,
      include: {
        seasonContest: {
          include: {
            season: true,
            contest: {
              include: { problems: { include: { tags: true } } },
            },
          },
        },
        UserGroupSeason: {
          include: { user: true, season: true },
        },
        UserGroupSeasonContestProblems: {
          include: { problem: { include: { tags: true } } },
        },
      },
    })
  }

  async count(where?: Prisma.UserGroupSeasonContestWhereInput): Promise<number> {
    return this.prismaService.UserGroupSeasonContest.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserGroupSeasonContestWhereUniqueInput
    where?: Prisma.UserGroupSeasonContestWhereInput
    orderBy?: Prisma.UserGroupSeasonContestOrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.UserGroupSeasonContest.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        seasonContest: {
          include: {
            season: true,
            contest: {
              include: { problems: { include: { tags: true } } },
            },
          },
        },
        UserGroupSeason: {
          include: { user: true, season: true },
        },
        UserGroupSeasonContestProblems: {
          include: { problem: { include: { tags: true } } },
        },
      },
    })
  }

  async findOne(where: Prisma.UserGroupSeasonContestWhereUniqueInput) {
    return this.prismaService.UserGroupSeasonContest.findUnique({
      where,
      include: {
        seasonContest: {
          include: {
            season: true,
            contest: {
              include: { problems: { include: { tags: true } } },
            },
          },
        },
        UserGroupSeason: {
          include: { user: true, season: true },
        },
        UserGroupSeasonContestProblems: {
          include: { problem: { include: { tags: true } } },
        },
      },
    })
  }

  async update(params: {
    where: Prisma.UserGroupSeasonContestWhereUniqueInput
    data: Prisma.UserGroupSeasonContestUpdateInput
  }) {
    const { where, data } = params
    return this.prismaService.UserGroupSeasonContest.update({
      data,
      where,
      include: {
        seasonContest: {
          include: {
            season: true,
            contest: {
              include: { problems: { include: { tags: true } } },
            },
          },
        },
        UserGroupSeason: {
          include: { user: true, season: true },
        },
        UserGroupSeasonContestProblems: {
          include: { problem: { include: { tags: true } } },
        },
      },
    })
  }

  async remove(where: Prisma.UserGroupSeasonContestWhereUniqueInput) {
    return this.prismaService.UserGroupSeasonContest.delete({ where })
  }
}
