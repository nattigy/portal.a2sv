import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class GroupSeasonRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.GroupSeasonCreateInput) {
    return this.prismaService.groupSeason.create({ data })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.GroupSeasonWhereInput
    orderBy?: Prisma.GroupSeasonOrderByWithRelationInput
  }) {
    const { skip, take, where, orderBy } = params
    return this.prismaService.groupSeason.findMany({
      skip,
      take,
      where,
      orderBy,
    })
  }

  async findOne(where: Prisma.GroupSeasonWhereUniqueInput) {
    return this.prismaService.groupSeason.findUnique({ where })
  }

  async update(params: {
    where: Prisma.GroupSeasonWhereUniqueInput
    data: Prisma.GroupSeasonUpdateInput
  }) {
    const { where, data } = params
    return this.prismaService.groupSeason.update({ data, where })
  }

  async remove(where: Prisma.GroupSeasonWhereUniqueInput) {
    return this.prismaService.groupSeason.delete({ where })
  }
}
