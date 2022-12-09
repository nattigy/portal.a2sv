import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { UserSeasonContestProblem } from './entities/user-season-contest-problem.entity'

@Injectable()
export class UserSeasonContestProblemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: Prisma.UserSeasonContestProblemCreateInput,
  ): Promise<UserSeasonContestProblem> {
    return this.prismaService.userSeasonContestProblem.create({
      data,
      include: {
        problem: { include: { tags: true } },
      },
    })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserSeasonContestProblemWhereUniqueInput
    where?: Prisma.UserSeasonContestProblemWhereInput
    orderBy?: Prisma.UserSeasonContestProblemOrderByWithRelationInput
  }): Promise<UserSeasonContestProblem[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.userSeasonContestProblem.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        problem: { include: { tags: true } },
      },
    })
  }

  async findOne(
    where: Prisma.UserSeasonContestProblemWhereUniqueInput,
  ): Promise<UserSeasonContestProblem> {
    return this.prismaService.userSeasonContestProblem.findUnique({
      where,
      include: {
        problem: { include: { tags: true } },
      },
    })
  }

  async update(params: {
    where: Prisma.UserSeasonContestProblemWhereUniqueInput
    data: Prisma.UserSeasonContestProblemUpdateInput
  }): Promise<UserSeasonContestProblem> {
    const { where, data } = params
    return this.prismaService.userSeasonContestProblem.update({
      data,
      where,
      include: {
        problem: { include: { tags: true } },
      },
    })
  }

  async remove(where: Prisma.UserSeasonContestProblemWhereUniqueInput) {
    return this.prismaService.userSeasonContestProblem.delete({ where })
  }
}
