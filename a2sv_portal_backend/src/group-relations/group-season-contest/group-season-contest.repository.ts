import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class GroupSeasonContestRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.GroupSeasonContestCreateInput) {
    return this.prismaService.groupSeasonContest.create({ data })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.GroupSeasonContestWhereUniqueInput
    where?: Prisma.GroupSeasonContestWhereInput
    orderBy?: Prisma.GroupSeasonContestOrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.groupSeasonContest.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async findOne(where: Prisma.GroupSeasonContestWhereUniqueInput) {
    return this.prismaService.groupSeasonContest.findUnique({ where })
  }

  async update(params: {
    where: Prisma.GroupSeasonContestWhereUniqueInput
    data: Prisma.GroupSeasonContestUpdateInput
  }) {
    const { where, data } = params
    return this.prismaService.groupSeasonContest.update({ data, where })
  }

  async remove(where: Prisma.GroupSeasonContestWhereUniqueInput) {
    return this.prismaService.groupSeasonContest.delete({ where })
  }
}
