import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { UserSeasonTopicProblem } from './entities/user-season-topic-problem.entity'

@Injectable()
export class UserSeasonTopicProblemRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async create(data: Prisma.UserSeasonTopicProblemCreateInput): Promise<UserSeasonTopicProblem> {
    return this.prismaService.userSeasonTopicProblem.create({
      data,
      include: {
        user: true,
        seasonTopicProblem: { include: { problem: { include: { tags: true } } } }
      }
    })
  }

  async count(where?: Prisma.UserSeasonTopicProblemWhereInput): Promise<number> {
    return this.prismaService.userSeasonTopicProblem.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.UserSeasonTopicProblemWhereInput
    orderBy?: Prisma.UserSeasonTopicProblemOrderByWithRelationInput
  }): Promise<UserSeasonTopicProblem[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.userSeasonTopicProblem.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        user: true,
        seasonTopicProblem: { include: { problem: { include: { tags: true } } } }
      }
    })
  }

  async findOne(where: Prisma.UserSeasonTopicProblemWhereUniqueInput): Promise<UserSeasonTopicProblem> {
    return this.prismaService.userSeasonTopicProblem.findUnique({
      where,
      include: {
        user: true,
        seasonTopicProblem: { include: { problem: { include: { tags: true } } } }
      }
    })
  }

  async update(params: {
    where: Prisma.UserSeasonTopicProblemWhereUniqueInput
    data: Prisma.UserSeasonTopicProblemUpdateInput
  }): Promise<UserSeasonTopicProblem> {
    const { where, data } = params
    return this.prismaService.userSeasonTopicProblem.update({
      data, where, 
      include: {
        user: true,
        seasonTopicProblem: { include: { problem: { include: { tags: true } } } }
      }
    })
  }

  async remove(where: Prisma.UserSeasonTopicProblemWhereUniqueInput) {
    return this.prismaService.userSeasonTopicProblem.delete({ where })
  }
}
