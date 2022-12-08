import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { Problem } from './entities/problem.entity'

@Injectable()
export class ProblemRepository {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(data: Prisma.ProblemCreateInput): Promise<Problem> {
    return this.prismaService.problem.create({
      data,
      include: { tags: true },
    })
  }

  async count(where?: Prisma.GroupWhereInput): Promise<number> {
    return this.prismaService.problem.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number,
    where?: Prisma.ProblemWhereInput
    orderBy?: Prisma.ProblemOrderByWithRelationInput
  }): Promise<Problem[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.problem.findMany({
      skip,
      take,
      where,
      include: { tags: true },
      orderBy,
    })
  }

  async findOne(where: Prisma.ProblemWhereUniqueInput) {
    return this.prismaService.problem.findUnique({ where, include: { tags: true } })
  }

  async update(params: {
    where: Prisma.ProblemWhereUniqueInput
    data: Prisma.ProblemUpdateInput
  }): Promise<Problem> {
    const { where, data } = params
    return this.prismaService.problem.update({
      data, where, include: {
        tags: true,
      },
    })
  }

  async remove(where: Prisma.ProblemWhereUniqueInput) {
    return this.prismaService.problem.delete({ where })
  }
}
