import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { UserSeasonContest } from './entities/user-season-contest.entity'

@Injectable()
export class UserSeasonContestRepository {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(data: Prisma.UserSeasonContestCreateInput): Promise<UserSeasonContest> {
    return this.prismaService.userSeasonContest.create({
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
        userSeason: {
          include: { user: true, season: true },
        },
        userSeasonContestProblems: {
          include: { problem: { include: { tags: true } } },
        },
      },
    })
  }

  async count(where?: Prisma.UserSeasonContestWhereInput): Promise<number> {
    return this.prismaService.userSeasonContest.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserSeasonContestWhereUniqueInput
    where?: Prisma.UserSeasonContestWhereInput
    orderBy?: Prisma.UserSeasonContestOrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.userSeasonContest.findMany({
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
        userSeason: {
          include: { user: true, season: true },
        },
        userSeasonContestProblems: {
          include: { problem: { include: { tags: true } } },
        },
      },
    })
  }

  async findOne(where: Prisma.UserSeasonContestWhereUniqueInput) {
    return this.prismaService.userSeasonContest.findUnique({
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
        userSeason: {
          include: { user: true, season: true },
        },
        userSeasonContestProblems: {
          include: { problem: { include: { tags: true } } },
        },
      },
    })
  }

  async update(params: {
    where: Prisma.UserSeasonContestWhereUniqueInput
    data: Prisma.UserSeasonContestUpdateInput
  }) {
    const { where, data } = params
    return this.prismaService.userSeasonContest.update({
      data, where,
      include: {
        seasonContest: {
          include: {
            season: true,
            contest: {
              include: { problems: { include: { tags: true } } },
            },
          },
        },
        userSeason: {
          include: { user: true, season: true },
        },
        userSeasonContestProblems: {
          include: { problem: { include: { tags: true } } },
        },
      },
    })
  }

  async remove(where: Prisma.UserSeasonContestWhereUniqueInput) {
    return this.prismaService.userSeasonContest.delete({ where })
  }
}
