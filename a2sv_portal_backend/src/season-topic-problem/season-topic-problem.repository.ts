import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { SeasonTopicProblem } from './entities/season-topic-problem.entity'

@Injectable()
export class SeasonTopicProblemRepository {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(data: Prisma.SeasonTopicProblemCreateInput | Prisma.SeasonTopicProblemUncheckedCreateInput): Promise<SeasonTopicProblem> {
    return this.prismaService.seasonTopicProblem.create({
      data,
      include: {
        problem: {
          include: {
            tags: true,
          },
        },
      },
    })
  }

  async count(where?: Prisma.SeasonTopicProblemWhereInput): Promise<number> {
    return this.prismaService.seasonTopicProblem.count({where})
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.SeasonTopicProblemWhereInput
    orderBy?: Prisma.SeasonTopicProblemOrderByWithRelationInput
  }): Promise<SeasonTopicProblem[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.seasonTopicProblem.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        problem: {
          include: {
            tags: true,
          },
        },
      },
    })
  }

  async findOne(where: Prisma.SeasonTopicProblemWhereUniqueInput): Promise<SeasonTopicProblem> {
    return this.prismaService.seasonTopicProblem.findUnique({
      where,
      include: {
        problem: {
          include: {
            tags: true,
          },
        },
      },
    })
  }

  async update(params: {
    where: Prisma.SeasonTopicProblemWhereUniqueInput
    data: Prisma.SeasonTopicProblemUpdateInput
  }): Promise<SeasonTopicProblem> {
    const { where, data } = params
    return this.prismaService.seasonTopicProblem.update({
      data, where,
      include: {
        problem: {
          include: {
            tags: true,
          },
        },
      },
    })
  }

  async remove(where: Prisma.SeasonTopicProblemWhereUniqueInput) {
    return this.prismaService.seasonTopicProblem.delete({ where })
  }
}
