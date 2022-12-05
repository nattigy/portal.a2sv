import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { GroupSeasonTopicProblem } from './entities/group-season-topic-problem.entity'

@Injectable()
export class GroupSeasonTopicProblemRepository {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(
    data: Prisma.GroupSeasonTopicProblemCreateInput | Prisma.GroupSeasonTopicProblemUncheckedCreateInput,
  ): Promise<GroupSeasonTopicProblem> {
    return this.prismaService.groupSeasonTopicProblem.create({
      data,
      include: { problem: { include: { tags: true } } },
    })
  }

  async count(where?: Prisma.GroupSeasonTopicProblemWhereInput): Promise<number> {
    return this.prismaService.groupSeasonTopicProblem.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.GroupSeasonTopicProblemWhereInput
    orderBy?: Prisma.GroupSeasonTopicProblemOrderByWithRelationInput
  }): Promise<GroupSeasonTopicProblem[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.groupSeasonTopicProblem.findMany({
      skip,
      take,
      where,
      orderBy,
      include: { problem: { include: { tags: true } } },
    })
  }

  async findOne(where: Prisma.GroupSeasonTopicProblemWhereUniqueInput): Promise<GroupSeasonTopicProblem> {
    return this.prismaService.groupSeasonTopicProblem.findUnique({
      where,
      include: { problem: { include: { tags: true } } },
    })
  }

  async update(params: {
    where: Prisma.GroupSeasonTopicProblemWhereUniqueInput
    data: Prisma.GroupSeasonTopicProblemUpdateInput | Prisma.GroupSeasonTopicProblemUncheckedUpdateInput
  }): Promise<GroupSeasonTopicProblem> {
    const { where, data } = params
    return this.prismaService.groupSeasonTopicProblem.update({
      data, where,
      include: { problem: { include: { tags: true } } },
    })
  }

  async remove(where: Prisma.GroupSeasonTopicProblemWhereUniqueInput) {
    return this.prismaService.groupSeasonTopicProblem.delete({ where })
  }
}
