import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { UserGroupSeasonContest } from './entities/user-group-season-contest.entity'

@Injectable()
export class UserGroupSeasonContestRepository {
  include = {
    contest: {
      include: { problems: { include: { tags: true } } },
    },
    userGroupSeasonContestProblems: {
      include: {
        problem: { include: { tags: true } },
      },
    },
  }

  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: Prisma.UserGroupSeasonContestCreateInput,
  ): Promise<UserGroupSeasonContest> {
    return this.prismaService.userGroupSeasonContest.create({
      data,
      include: this.include,
    })
  }

  async count(where?: Prisma.UserGroupSeasonContestWhereInput): Promise<number> {
    return this.prismaService.userGroupSeasonContest.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.UserGroupSeasonContestWhereInput
    orderBy?: Prisma.UserGroupSeasonContestOrderByWithRelationInput
  }): Promise<UserGroupSeasonContest[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.userGroupSeasonContest.findMany({
      skip,
      take,
      where,
      orderBy,
      include: this.include,
    })
  }

  async findOne(
    where: Prisma.UserGroupSeasonContestWhereUniqueInput,
  ): Promise<UserGroupSeasonContest> {
    return this.prismaService.userGroupSeasonContest.findUnique({
      where,
      include: this.include,
    })
  }

  async update(params: {
    where: Prisma.UserGroupSeasonContestWhereUniqueInput
    data: Prisma.UserGroupSeasonContestUpdateInput
  }): Promise<UserGroupSeasonContest> {
    const { where, data } = params
    return this.prismaService.userGroupSeasonContest.update({
      data,
      where,
      include: this.include,
    })
  }

  async remove(where: Prisma.UserGroupSeasonContestWhereUniqueInput) {
    return this.prismaService.userGroupSeasonContest.delete({ where })
  }
}
