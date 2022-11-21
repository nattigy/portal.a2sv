import { Injectable, NotFoundException } from '@nestjs/common'
import { GroupStatResponsePage, PaginationGroup } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { PrismaService } from '../prisma/prisma.service'
import { CreateGroupInput } from './dto/create-group.input'
import { FilterGroupInput } from './dto/filter-group.input'
import { GroupStatResponse } from './dto/group-stat-response'
import { GroupsPaginated, GroupsUsersPaginated } from './dto/groups-return-dto'
import { UpdateGroupInput } from './dto/update-group.input'
import { Group } from './entities/group.entity'

@Injectable()
export class GroupsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createGroupInput: CreateGroupInput): Promise<Group> {
    return this.prismaService.group.create({
      include: {
        users: true,
        head: true,
        seasons: {
          include: {
            topics: true,
          },
        },
      },
      data: createGroupInput,
    })
  }

  async findOne(id: string): Promise<Group> {
    const group = await this.prismaService.group.findUnique({
      include: {
        users: true,
        head: true,
        seasons: {
          include: {
            topics: {
              include: {
                problems: {
                  include: {
                    problem: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        id,
      },
    })
    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`)
    }
    return group
  }

  async findAll(
    filterGroupInput: FilterGroupInput,
    { skip, take }: PaginationInfoInput = { take: 50, skip: 0 },
  ): Promise<PaginationGroup> {
    const count = (
      await this.prismaService.group.findMany({
        where: filterGroupInput,
        select: {
          id: true,
        },
      })
    ).length
    const groups = await this.prismaService.group.findMany({
      skip,
      take,
      where: filterGroupInput,
      include: {
        users: true,
        head: true,
        seasons: {
          include: {
            topics: {
              include: {
                problems: {
                  include: {
                    problem: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    return {
      items: groups,
      pageInfo: {
        skip,
        count,
        take,
      },
    }
  }

  async groupsPagination(
    filterGroupInput: FilterGroupInput,
    { skip, take }: PaginationInfoInput,
    userPaginationInput: PaginationInfoInput = { take: 100, skip: 0 },
  ): Promise<GroupsPaginated> {
    const groupsCount = (
      await this.prismaService.group.findMany({
        where: filterGroupInput,
      })
    ).length
    const groups = await this.prismaService.group.findMany({
      where: filterGroupInput,
      skip,
      take,
      include: {
        users: {
          take: userPaginationInput.take,
          skip: userPaginationInput.skip,
        },
        head: true,
        seasons: {
          include: {
            topics: {
              include: {
                problems: {
                  include: {
                    problem: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    const groupsUsersPaginated: GroupsUsersPaginated[] = []

    for (let i = 0; i < groups.length; i++) {
      const users = (
        await this.prismaService.group.findUnique({
          where: {
            id: groups[i].id,
          },
          include: {
            users: true,
          },
        })
      ).users
      groupsUsersPaginated.push({
        group: groups[i],
        pageInfo: {
          skip: userPaginationInput.skip,
          take: userPaginationInput.take,
          count: users.length,
        },
      })
    }

    return {
      items: groupsUsersPaginated,
      pageInfo: {
        skip,
        take,
        count: groupsCount,
      },
    }
  }

  async update({ id, ...updates }: UpdateGroupInput): Promise<Group> {
    return this.prismaService.group.update({
      where: { id },
      data: updates,
    })
  }

  async deleteGroup(id: string): Promise<Group> {
    return this.prismaService.group.delete({
      where: { id },
    })
  }

  async groupsStat(
    filterGroupInput: FilterGroupInput,
    { skip, take }: PaginationInfoInput = { take: 50, skip: 0 },
  ): Promise<GroupStatResponsePage<GroupStatResponse>> {
    const groupStatResponses: GroupStatResponse[] = []
    const groupCount = (
      await this.prismaService.group.findMany({
        where: filterGroupInput,
        select: {
          id: true,
        },
      })
    ).length
    const groups = await this.prismaService.group.findMany({
      skip,
      take,
      where: filterGroupInput,
      include: {
        users: {
          include: {
            seasonTopicProblems: true,
          },
        },
        seasons: {
          take: 1,
          where: {
            isActive: true,
          },
          include: {
            topics: {
              include: {
                problems: true,
              },
            },
          },
        },
        groupContests: true,
      },
    })
    if (!groups) {
      throw new NotFoundException(`No groups found`)
    }
    for (let i = 0; i < groups.length; i++) {
      let numberOfAcceptedSubmissions = 0
      let numberOfWrongSubmissions = 0
      let totalTimeDedicated = 0
      let numberOfTopicsCovered = 0
      let numberOfProblems = 0
      const contestsAttended = groups[i].groupContests.length
      groups[i].users.forEach(u => {
        u.seasonTopicProblems.forEach(g => {
          if (groups[i].seasons.length > 0 && g.seasonId == groups[i].seasons[0].id) {
            if (g.solved) numberOfAcceptedSubmissions += 1
            numberOfWrongSubmissions += g.attempts
            totalTimeDedicated += g.timeDedicated
          }
        })
      })
      groups[i].seasons.forEach(s => {
        numberOfTopicsCovered += s.topics.length
        s.topics.forEach(t => {
          numberOfProblems += t.problems.length
        })
      })
      groupStatResponses.push({
        id: groups[i].id,
        name: groups[i].name,
        createdAt: groups[i].createdAt,
        country: groups[i].country,
        school: groups[i].school,
        numberOfStudents: groups[i].users?.length,
        numberOfTopicsCovered: numberOfTopicsCovered,
        topicsCoverage: numberOfTopicsCovered,
        // topics.length
        // ? (numberOfTopicsCovered / topics.length) * 100
        // : 0,
        numberOfAcceptedSubmissions: numberOfAcceptedSubmissions,
        numberOfWrongSubmissions: numberOfWrongSubmissions,
        totalTimeDedicated: totalTimeDedicated,
        numberOfProblems: numberOfProblems,
        contestsAttended: contestsAttended,
        // rank: groups[i].id,
      })
    }
    return {
      items: groupStatResponses,
      pageInfo: {
        skip,
        take,
        count: groupCount,
      },
    }
  }

  async groupStat(groupId: string): Promise<GroupStatResponse> {
    const group = await this.prismaService.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        users: {
          include: {
            seasonTopicProblems: true,
          },
        },
        seasons: {
          take: 1,
          where: {
            isActive: true,
          },
          include: {
            topics: {
              include: {
                problems: true,
              },
            },
          },
        },
        groupContests: true,
      },
    })
    if (!group) {
      throw new NotFoundException(`Group not found`)
    }
    let numberOfAcceptedSubmissions = 0
    let numberOfWrongSubmissions = 0
    let totalTimeDedicated = 0
    let numberOfTopicsCovered = 0
    let numberOfProblems = 0
    const contestsAttended = group.groupContests.length
    group.users.forEach(u => {
      u.seasonTopicProblems.forEach(g => {
        if (group.seasons.length > 0 && g.seasonId == group.seasons[0].id) {
          if (g.solved) numberOfAcceptedSubmissions += 1
          numberOfWrongSubmissions += g.attempts
          totalTimeDedicated += g.timeDedicated
        }
      })
    })
    group.seasons.forEach(s => {
      numberOfTopicsCovered += s.topics.length
      s.topics.forEach(t => {
        numberOfProblems += t.problems.length
      })
    })
    return {
      id: group.id,
      name: group.name,
      createdAt: group.createdAt,
      country: group.country,
      school: group.school,
      numberOfStudents: group.users?.length,
      numberOfTopicsCovered: numberOfTopicsCovered,
      topicsCoverage: numberOfTopicsCovered,
      // topics.length
      // ? (numberOfTopicsCovered / topics.length) * 100
      // : 0,
      numberOfAcceptedSubmissions: numberOfAcceptedSubmissions,
      numberOfWrongSubmissions: numberOfWrongSubmissions,
      totalTimeDedicated: totalTimeDedicated,
      numberOfProblems: numberOfProblems,
      contestsAttended: contestsAttended,
      // rank: groups[i].id,
    }
  }
}
