import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class SeasonContestRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.SeasonContestCreateInput) {
    return this.prismaService.seasonContest.create({ data })
  }

  async count(where?: Prisma.SeasonContestWhereInput): Promise<number> {
    return this.prismaService.seasonContest.count({where})
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.SeasonContestWhereInput
    orderBy?: Prisma.SeasonContestOrderByWithRelationInput
  }) {
    const { skip, take, where, orderBy } = params
    return this.prismaService.seasonContest.findMany({
      skip,
      take,
      where,
      orderBy,
    })
  }

  async findOne(where: Prisma.SeasonContestWhereUniqueInput) {
    return this.prismaService.seasonContest.findUnique({ where })
  }

  async update(params: {
    where: Prisma.SeasonContestWhereUniqueInput
    data: Prisma.SeasonContestUpdateInput
  }) {
    const { where, data } = params
    return this.prismaService.seasonContest.update({ data, where })
  }

  async remove(where: Prisma.SeasonContestWhereUniqueInput) {
    return this.prismaService.seasonContest.delete({ where })
  }
}
