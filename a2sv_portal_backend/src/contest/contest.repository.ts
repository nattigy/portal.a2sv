import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class ContestRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.ContestCreateInput) {
    return this.prismaService.contest.create({ data })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ContestWhereUniqueInput
    where?: Prisma.ContestWhereInput
    orderBy?: Prisma.ContestOrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.contest.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async findOne(where: Prisma.ContestWhereUniqueInput) {
    return this.prismaService.contest.findUnique({ where })
  }

  async update(params: {
    where: Prisma.ContestWhereUniqueInput
    data: Prisma.ContestUpdateInput
  }) {
    const { where, data } = params
    return this.prismaService.contest.update({ data, where })
  }

  async remove(where: Prisma.ContestWhereUniqueInput) {
    return this.prismaService.contest.delete({ where })
  }
}
