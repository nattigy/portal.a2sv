import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class UserSeasonTopicProblemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserSeasonTopicProblemCreateInput) {
    return this.prismaService.userSeasonTopicProblem.create({ data })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserSeasonTopicProblemWhereUniqueInput
    where?: Prisma.UserSeasonTopicProblemWhereInput
    orderBy?: Prisma.UserSeasonTopicProblemOrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.userSeasonTopicProblem.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async findOne(where: Prisma.UserSeasonTopicProblemWhereUniqueInput) {
    return this.prismaService.userSeasonTopicProblem.findUnique({ where })
  }

  async update(params: {
    where: Prisma.UserSeasonTopicProblemWhereUniqueInput
    data: Prisma.UserSeasonTopicProblemUpdateInput
  }) {
    const { where, data } = params
    return this.prismaService.userSeasonTopicProblem.update({ data, where })
  }

  async remove(where: Prisma.UserSeasonTopicProblemWhereUniqueInput) {
    return this.prismaService.userSeasonTopicProblem.delete({ where })
  }
}
