import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class SeasonRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.SeasonCreateInput) {
    return this.prismaService.season.create({ data })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.SeasonWhereUniqueInput
    where?: Prisma.SeasonWhereInput
    orderBy?: Prisma.SeasonOrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params

    return this.prismaService.season.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async findOne(where: Prisma.SeasonWhereUniqueInput) {
    return this.prismaService.season.findUnique({ where })
  }

  async update(params: {
    where: Prisma.SeasonWhereUniqueInput
    data: Prisma.SeasonUpdateInput
  }) {
    const { where, data } = params
    return this.prismaService.season.update({ data, where })
  }

  async remove(where: Prisma.SeasonWhereUniqueInput) {
    return this.prismaService.season.delete({ where })
  }

  async count(where?: Prisma.SeasonWhereInput): Promise<number> {
    return this.prismaService.season.count({ where })
  }
}
