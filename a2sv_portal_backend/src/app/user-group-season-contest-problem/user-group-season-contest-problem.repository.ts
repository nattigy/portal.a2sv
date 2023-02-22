import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { UserGroupSeasonContestProblem } from './entities/user-group-season-contest-problem.entity'

@Injectable()
export class UserGroupSeasonContestProblemRepository {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(
    data: Prisma.UserGroupSeasonContestProblemCreateInput,
  ): Promise<UserGroupSeasonContestProblem> {
    return this.prismaService.userGroupSeasonContestProblem.create({
      data,
      include: {
        contestProblem: { include: { problem: { include: { tags: true } } } },
      },
    })
  }

  async count(where?: Prisma.UserGroupSeasonContestProblemWhereInput): Promise<number> {
    return this.prismaService.userGroupSeasonContestProblem.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.UserGroupSeasonContestProblemWhereInput
    orderBy?: Prisma.UserGroupSeasonContestProblemOrderByWithRelationInput
  }): Promise<UserGroupSeasonContestProblem[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.userGroupSeasonContestProblem.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        contestProblem: { include: { problem: { include: { tags: true } } } },
      },
    })
  }

  async findOne(
    where: Prisma.UserGroupSeasonContestProblemWhereUniqueInput,
  ): Promise<UserGroupSeasonContestProblem> {
    return this.prismaService.userGroupSeasonContestProblem.findUnique({
      where,
      include: {
        contestProblem: { include: { problem: { include: { tags: true } } } },
      },
    })
  }

  async update(params: {
    where: Prisma.UserGroupSeasonContestProblemWhereUniqueInput
    data: Prisma.UserGroupSeasonContestProblemUpdateInput
  }): Promise<UserGroupSeasonContestProblem> {
    const { where, data } = params
    return this.prismaService.userGroupSeasonContestProblem.update({
      data,
      where,
      include: {
        contestProblem: { include: { problem: { include: { tags: true } } } },
      },
    })
  }

  async remove(where: Prisma.UserGroupSeasonContestProblemWhereUniqueInput) {
    return this.prismaService.userGroupSeasonContestProblem.delete({ where })
  }
}
