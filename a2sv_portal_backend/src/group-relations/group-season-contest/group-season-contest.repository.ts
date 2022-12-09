import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { GroupSeasonContest } from './entities/group-season-contest.entity'

@Injectable()
export class GroupSeasonContestRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.GroupSeasonContestCreateInput): Promise<GroupSeasonContest> {
    return this.prismaService.groupSeasonContest.create({
      data,
      include: {
        // groupSeason: {
        //   include: { group: true, season: true, head: true },
        // },
        // seasonContest: {
        //   include: {
        //     season: true,
        //     contest: {
        //       include: { problems: { include: { tags: true } } },
        //     },
        //   },
        // },
      },
    })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.GroupSeasonContestWhereUniqueInput
    where?: Prisma.GroupSeasonContestWhereInput
    orderBy?: Prisma.GroupSeasonContestOrderByWithRelationInput
  }): Promise<GroupSeasonContest[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.groupSeasonContest.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        // groupSeason: {
        //   include: { group: true, season: true, head: true },
        // },
        // seasonContest: {
        //   include: {
        //     season: true,
        //     contest: {
        //       include: { problems: { include: { tags: true } } },
        //     },
        //   },
        // },
      },
    })
  }

  async findOne(
    where: Prisma.GroupSeasonContestWhereUniqueInput,
  ): Promise<GroupSeasonContest> {
    return this.prismaService.groupSeasonContest.findUnique({
      where,
      include: {
        // groupSeason: {
        //   include: { group: true, season: true, head: true },
        // },
        // seasonContest: {
        //   include: {
        //     season: true,
        //     contest: {
        //       include: { problems: { include: { tags: true } } },
        //     },
        //   },
        // },
      },
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
      include: {
        // groupSeason: {
        //   include: { group: true, season: true, head: true },
        // },
        // seasonContest: {
        //   include: {
        //     season: true,
        //     contest: {
        //       include: { problems: { include: { tags: true } } },
        //     },
        //   },
        // },
      },
    })
  }

  async remove(where: Prisma.GroupSeasonContestWhereUniqueInput) {
    return this.prismaService.groupSeasonContest.delete({ where })
  }
}
