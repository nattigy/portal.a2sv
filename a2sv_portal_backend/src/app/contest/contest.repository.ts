import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { Contest } from './entities/contest.entity'
import { ContestProblemsIncludeObject } from '../contest-problem/contest-problem.repository'

export const ContestIncludeObject = ContestProblemsIncludeObject

@Injectable()
export class ContestRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.ContestCreateInput): Promise<Contest> {
    return this.prismaService.contest.create({
      data,
      include: ContestIncludeObject,
    })
  }

  async count(where?: Prisma.ContestWhereInput): Promise<number> {
    return this.prismaService.contest.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.ContestWhereInput
    orderBy?: Prisma.ContestOrderByWithRelationInput
  }): Promise<Contest[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.contest.findMany({
      skip,
      take,
      orderBy,
      where,
      include: ContestIncludeObject,
    })
  }

  async findOne(where: Prisma.ContestWhereUniqueInput): Promise<Contest> {
    return this.prismaService.contest.findUnique({
      where,
      include: ContestIncludeObject,
    })
  }

  async update(params: {
    where: Prisma.ContestWhereUniqueInput
    data: Prisma.ContestUpdateInput
  }): Promise<Contest> {
    const { where, data } = params
    return this.prismaService.contest.update({
      data,
      where,
      include: ContestIncludeObject,
    })
  }

  async remove(where: Prisma.ContestWhereUniqueInput) {
    return this.prismaService.contest.delete({ where })
  }
}
