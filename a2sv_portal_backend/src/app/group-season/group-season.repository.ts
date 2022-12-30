import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { GroupSeason } from './entities/group-season.entity'

@Injectable()
export class GroupSeasonRepository {
  include = {
    head: true,
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
      },
    },
  }

  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.GroupSeasonCreateInput): Promise<GroupSeason> {
    return this.prismaService.groupSeason.create({
      data,
      include: {
        head: true,
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
          },
        },
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

  async findFirst(where: Prisma.GroupSeasonWhereInput): Promise<GroupSeason> {
    return await this.prismaService.groupSeason.findFirst({
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
