import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class SeasonTopicProblemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.SeasonTopicProblemCreateInput) {
    return this.prismaService.seasonTopicProblem.create({ data })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.SeasonTopicProblemWhereUniqueInput
    where?: Prisma.SeasonTopicProblemWhereInput
    orderBy?: Prisma.SeasonTopicProblemOrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.seasonTopicProblem.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async findOne(where: Prisma.SeasonTopicProblemWhereUniqueInput) {
    return this.prismaService.seasonTopicProblem.findUnique({ where })
  }

  async update(params: {
    where: Prisma.SeasonTopicProblemWhereUniqueInput
    data: Prisma.SeasonTopicProblemUpdateInput
  }) {
    const { where, data } = params
    return this.prismaService.seasonTopicProblem.update({ data, where })
  }

  async remove(where: Prisma.SeasonTopicProblemWhereUniqueInput) {
    return this.prismaService.seasonTopicProblem.delete({ where })
  }
}
