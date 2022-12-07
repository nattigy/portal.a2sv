import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class UserSeasonContestRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserSeasonContestCreateInput) {
    return this.prismaService.userSeasonContest.create({ data })
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
    })
  }

  async findOne(where: Prisma.UserSeasonContestWhereUniqueInput) {
    return this.prismaService.userSeasonContest.findUnique({ where })
  }

  async update(params: {
    where: Prisma.UserSeasonContestWhereUniqueInput
    data: Prisma.UserSeasonContestUpdateInput
  }) {
    const { where, data } = params
    return this.prismaService.userSeasonContest.update({ data, where })
  }

  async remove(where: Prisma.UserSeasonContestWhereUniqueInput) {
    return this.prismaService.userSeasonContest.delete({ where })
  }
}
