import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { GroupSeason } from './entities/group-season.entity'

@Injectable()
export class GroupSeasonRepository {
  include = {
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
      include: {
        contest: {
          include: {
            contestProblems: { include: { problem: { include: { tags: true } } } },
          },
        },
        groupSeasonContestProblems: {
          include: {
            userGroupSeasonContestProblems: {
              include: {
                contestProblem: { include: { problem: { include: { tags: true } } } },
              },
            },
            contestProblem: { include: { problem: { include: { tags: true } } } },
          },
        },
      },
    },
    groupSeasonHeads: { include: { user: true } },
  }

  constructor(private readonly prismaService: PrismaService) {}

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
          include: {
            contest: {
              include: {
                contestProblems: { include: { problem: { include: { tags: true } } } },
              },
            },
            groupSeasonContestProblems: {
              include: {
                userGroupSeasonContestProblems: {
                  include: {
                    contestProblem: { include: { problem: { include: { tags: true } } } },
                  },
                },
                contestProblem: { include: { problem: { include: { tags: true } } } },
              },
            },
          },
        },
        groupSeasonHeads: { include: { user: true } },
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
  }): Promise<GroupSeason[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.groupSeason.findMany({
      skip,
      take,
      where,
      orderBy,
      include: this.include,
    })
  }

  async findOne(where: Prisma.GroupSeasonWhereUniqueInput): Promise<GroupSeason> {
    return this.prismaService.groupSeason.findUnique({
      where,
      include: this.include,
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
      include: this.include,
    })
  }

  async remove(where: Prisma.GroupSeasonWhereUniqueInput) {
    return this.prismaService.groupSeason.delete({ where })
  }
}
