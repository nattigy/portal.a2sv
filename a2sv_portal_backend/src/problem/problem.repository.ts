import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class ProblemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.ProblemCreateInput) {
    return this.prismaService.problem.create({ data })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ProblemWhereUniqueInput
    where?: Prisma.ProblemWhereInput
    orderBy?: Prisma.ProblemOrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.problem.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async findOne(where: Prisma.ProblemWhereUniqueInput) {
    return this.prismaService.problem.findUnique({ where })
  }

  async update(params: {
    where: Prisma.ProblemWhereUniqueInput
    data: Prisma.ProblemUpdateInput
  }) {
    const { where, data } = params
    return this.prismaService.problem.update({ data, where })
  }

  async remove(where: Prisma.ProblemWhereUniqueInput) {
    return this.prismaService.problem.delete({ where })
  }
}
