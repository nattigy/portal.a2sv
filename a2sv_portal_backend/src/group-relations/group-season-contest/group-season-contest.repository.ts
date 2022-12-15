import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { GroupSeasonContest } from './entities/group-season-contest.entity'

@Injectable()
export class GroupSeasonContestRepository {
  constructor(private readonly prismaService: PrismaService) {}

  include = {
    seasonContest: {
      include: {
        season: true,
        contest: {
          include: { problems: { include: { tags: true } } },
        },
      },
    },
    groupSeasonContestProblems: {
      include: {
        problem: { include: { tags: true } },
      },
    },
  }

  async create(data: Prisma.GroupSeasonContestCreateInput): Promise<GroupSeasonContest> {
    return this.prismaService.groupSeasonContest.create({
      data,
      include: this.include,
    })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.GroupSeasonContestWhereInput
    orderBy?: Prisma.GroupSeasonContestOrderByWithRelationInput
  }): Promise<GroupSeasonContest[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.groupSeasonContest.findMany({
      skip,
      take,
      where,
      orderBy,
      include: this.include,
    })
  }

  async findOne(
    where: Prisma.GroupSeasonContestWhereUniqueInput,
  ): Promise<GroupSeasonContest> {
    return this.prismaService.groupSeasonContest.findUnique({
      where,
      include: this.include,
    })
  }

  async update(params: {
    where: Prisma.GroupSeasonContestWhereUniqueInput
    data: Prisma.GroupSeasonContestUpdateInput
  }): Promise<GroupSeasonContest> {
    const { where, data } = params
    return this.prismaService.groupSeasonContest.update({
      data,
      where,
      include: this.include,
    })
  }

  async remove(where: Prisma.GroupSeasonContestWhereUniqueInput) {
    return this.prismaService.groupSeasonContest.delete({ where })
  }
}
