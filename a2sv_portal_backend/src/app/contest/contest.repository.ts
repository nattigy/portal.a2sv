import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { Contest } from './entities/contest.entity'

@Injectable()
export class ContestRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: Prisma.ContestCreateInput | Prisma.ContestUncheckedCreateInput,
  ): Promise<Contest> {
    return this.prismaService.contest.create({
      data,
      include: { problems: { include: { tags: true } } },
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
      include: { problems: { include: { tags: true } } },
    })
  }

  async findOne(where: Prisma.ContestWhereUniqueInput): Promise<Contest> {
    return this.prismaService.contest.findUnique({
      where,
      include: { problems: { include: { tags: true } } },
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
      include: { problems: { include: { tags: true } } },
    })
  }

  async remove(where: Prisma.ContestWhereUniqueInput) {
    return this.prismaService.contest.delete({ where })
  }
}
