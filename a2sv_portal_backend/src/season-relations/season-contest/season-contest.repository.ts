import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { SeasonContest } from './entities/season-contest.entity'

@Injectable()
export class SeasonContestRepository {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(data: Prisma.SeasonContestCreateInput | Prisma.SeasonContestUncheckedCreateInput): Promise<SeasonContest> {
    return this.prismaService.seasonContest.create({
      data,
      include: {
        season: true,
        contest: {
          include: { problems: { include: { tags: true } } },
        },
      },
    })
  }

  async count(where?: Prisma.SeasonContestWhereInput): Promise<number> {
    return this.prismaService.seasonContest.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.SeasonContestWhereInput
    orderBy?: Prisma.SeasonContestOrderByWithRelationInput
  }): Promise<SeasonContest[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.seasonContest.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        season: true,
        contest: {
          include: { problems: { include: { tags: true } } },
        },
      },
    })
  }

  async findOne(where: Prisma.SeasonContestWhereUniqueInput): Promise<SeasonContest> {
    return this.prismaService.seasonContest.findUnique({
      where,
      include: {
        season: true,
        contest: {
          include: { problems: { include: { tags: true } } },
        },
      },
    })
  }

  async update(params: {
    where: Prisma.SeasonContestWhereUniqueInput
    data: Prisma.SeasonContestUpdateInput
  }): Promise<SeasonContest> {
    const { where, data } = params
    return this.prismaService.seasonContest.update({
      data,
      where,
      include: {
        season: true,
        contest: {
          include: { problems: { include: { tags: true } } },
        },
      },
    })
  }

  async remove(where: Prisma.SeasonContestWhereUniqueInput) {
    return this.prismaService.seasonContest.delete({ where })
  }
}
