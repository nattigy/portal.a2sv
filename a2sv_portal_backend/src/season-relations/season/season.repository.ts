import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { Season } from './entities/season.entity'

@Injectable()
export class SeasonRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.SeasonCreateInput): Promise<Season> {
    return this.prismaService.season.create({ data })
  }

  async count(where?: Prisma.SeasonWhereInput): Promise<number> {
    return this.prismaService.season.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.SeasonWhereUniqueInput
    where?: Prisma.SeasonWhereInput
    orderBy?: Prisma.SeasonOrderByWithRelationInput
  }): Promise<Season[]> {
    const { skip, take, cursor, where, orderBy } = params

    return this.prismaService.season.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async findOne(where: Prisma.SeasonWhereUniqueInput): Promise<Season> {
    return this.prismaService.season.findUnique({ where })
  }

  async update(params: {
    where: Prisma.SeasonWhereUniqueInput
    data: Prisma.SeasonUpdateInput
  }): Promise<Season> {
    const { where, data } = params
    return this.prismaService.season.update({ data, where })
  }

  async remove(where: Prisma.SeasonWhereUniqueInput) {
    return this.prismaService.season.delete({ where })
  }
}
