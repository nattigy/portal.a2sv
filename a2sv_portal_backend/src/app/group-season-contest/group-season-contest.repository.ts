import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { GroupSeasonContest } from './entities/group-season-contest.entity'
import { DateTimeFilter } from 'src/common/filter-types/date-filter'

@Injectable()
export class GroupSeasonContestRepository {
  include = {
    contest: {
      include: { problems: { include: { tags: true } } },
    },
    groupSeasonContestProblems: {
      include: {
        userGroupSeasonContestProblems: {
          include: {
            problem: { include: { tags: true } },
          },
        },
        problem: { include: { tags: true } },
      },
    },
  }

  constructor(private readonly prismaService: PrismaService) {}

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

  async upsert(params: {
    where:Prisma.GroupSeasonContestWhereUniqueInput
  data: Prisma.GroupSeasonContestUpdateInput
}): Promise<GroupSeasonContest>{
    const {where, data} = params
    return this.prismaService.groupSeasonContest.upsert({
      where,
      create:{
        groupSeason:{
          connect:{
            groupId_seasonId:{
              groupId: where.groupId_seasonId_contestId.groupId,
              seasonId: where.groupId_seasonId_contestId.seasonId,
            }
          }
        },
        seasonContest:{
          connect:{
            seasonId_contestId:{
              seasonId: where.groupId_seasonId_contestId.seasonId,
              contestId: where.groupId_seasonId_contestId.contestId
            }
          }
        },
        contest: {connect:{id:where.groupId_seasonId_contestId.contestId}},
        startTime: data.startTime as Date,
        endTime: data.endTime as Date,
      },
      update:data,
      include:this.include,
    })

  }

  async remove(where: Prisma.GroupSeasonContestWhereUniqueInput) {
    return this.prismaService.groupSeasonContest.delete({ where })
  }
}
