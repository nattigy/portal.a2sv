import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { GroupSeason } from './entities/group-season.entity'
import { GroupSeasonContestIncludeObject } from '../group-season-contest/group-season-contest.repository'
import { GroupSeasonTopicIncludeObject } from '../group-season-topic/group-season-topic.repository'

export const GroupSeasonIncludeObject = {
  group: true,
  season: true,
  groupSeasonTopics: {
    include: GroupSeasonTopicIncludeObject,
  },
  groupSeasonContests: {
    include: GroupSeasonContestIncludeObject,
  },
  groupSeasonHeads: { include: { user: true } },
  userGroupSeasons: { include: { user: true } },
}

@Injectable()
export class GroupSeasonRepository {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(data: Prisma.GroupSeasonCreateInput): Promise<GroupSeason> {
    return this.prismaService.groupSeason.create({
      data,
      include: {
        group: true,
        season: true,
        groupSeasonTopics: {
          include: {
            topic: true,
            groupSeasonTopicProblems: {
              include: {
                userGroupSeasonTopicProblems: {
                  include: {
                    problem: { include: { tags: true } },
                  },
                },
                problem: { include: { tags: true } },
              },
            },
          },
        },
        groupSeasonContests: {
          include: GroupSeasonContestIncludeObject,
        },
        groupSeasonHeads: { include: { user: true } },
        userGroupSeasons: { include: { user: true } },
      },
    })
  }

  async count(where?: Prisma.GroupSeasonWhereInput): Promise<number> {
    return this.prismaService.groupSeason.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.GroupSeasonWhereInput
    orderBy?: Prisma.GroupSeasonOrderByWithRelationInput
  }) {
    const { skip, take, where, orderBy } = params
    return this.prismaService.groupSeason.findMany({
      skip,
      take,
      where,
      orderBy,
      include: GroupSeasonIncludeObject,
    })
  }

  async findOne(where: Prisma.GroupSeasonWhereUniqueInput) {
    return this.prismaService.groupSeason.findUnique({
      where,
      include: GroupSeasonIncludeObject,
    })
  }

  async update(params: {
    where: Prisma.GroupSeasonWhereUniqueInput
    data: Prisma.GroupSeasonUpdateInput
  }): Promise<GroupSeason> {
    const { where, data } = params
    return this.prismaService.groupSeason.update({
      data,
      where,
      include: GroupSeasonIncludeObject,
    })
  }

  async remove(where: Prisma.GroupSeasonWhereUniqueInput) {
    return this.prismaService.groupSeason.delete({ where })
  }
}
