import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { UserGroupSeasonContestProblem } from './entities/user-season-contest-problem.entity'

@Injectable()
export class UserGroupSeasonContestProblemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: Prisma.UserGroupSeasonContestProblemCreateInput,
  ): Promise<UserGroupSeasonContestProblem> {
    return this.prismaService.UserGroupSeasonContestProblem.create({
      data,
      include: {
        problem: { include: { tags: true } },
      },
    })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserGroupSeasonContestProblemWhereUniqueInput
    where?: Prisma.UserGroupSeasonContestProblemWhereInput
    orderBy?: Prisma.UserGroupSeasonContestProblemOrderByWithRelationInput
  }): Promise<UserGroupSeasonContestProblem[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.UserGroupSeasonContestProblem.findMany({
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
    where: Prisma.UserGroupSeasonContestProblemWhereUniqueInput,
  ): Promise<UserGroupSeasonContestProblem> {
    return this.prismaService.UserGroupSeasonContestProblem.findUnique({
      where,
      include: {
        problem: { include: { tags: true } },
      },
    })
  }

  async update(params: {
    where: Prisma.UserGroupSeasonContestProblemWhereUniqueInput
    data: Prisma.UserGroupSeasonContestProblemUpdateInput
  }): Promise<UserGroupSeasonContestProblem> {
    const { where, data } = params
    return this.prismaService.UserGroupSeasonContestProblem.update({
      data,
      where,
      include: {
        problem: { include: { tags: true } },
      },
    })
  }

  async remove(where: Prisma.UserGroupSeasonContestProblemWhereUniqueInput) {
    return this.prismaService.UserGroupSeasonContestProblem.delete({ where })
  }
}
