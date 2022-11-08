import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateGroupInput } from './dto/create-group.input'
import { Group } from './entities/group.entity'
import { UpdateGroupInput } from './dto/update-group.input'
import { PrismaService } from '../prisma.service'
import { GroupStatResponse } from './dto/group-stat-response'
import { GroupWhereInput } from './dto/find-group.input'
import { GroupsPaginated, GroupsUsersPaginated } from './dto/groups-return-dto'
import { PageInfoInput } from '../common/page/page-info.input'
import { GroupsPage, GroupStatResponsePage } from '../common/page/page-info'

@Injectable()
export class GroupsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createGroup(createGroupInput: CreateGroupInput): Promise<Group> {
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

  async getGroupById(id: string): Promise<Group> {
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

  async getGroups(
    filter?: GroupWhereInput,
    pageInfoInput?: PageInfoInput,
  ): Promise<GroupsPage<Group>> {
    const { topicId, ...where } = filter || {}
    const groupsCount = (await this.prismaService.group.findMany({})).length
    const groups = await this.prismaService.group.findMany({
      skip: pageInfoInput?.skip,
      take: pageInfoInput?.limit,
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
        skip: pageInfoInput?.skip,
        count: groupsCount,
        limit: pageInfoInput?.limit,
      },
    }
  }

  async groupsPagination(
    filter?: GroupWhereInput,
    pageInfoInput?: PageInfoInput,
    userPaginationInput?: PageInfoInput,
  ): Promise<GroupsPaginated> {
    const { topicId, ...where } = filter || {}
    const groupsCount = (
      await this.prismaService.group.findMany({
        where,
      })
    ).length
    const groups = await this.prismaService.group.findMany({
      where,
      skip: pageInfoInput.skip,
      take: pageInfoInput.limit,
      include: {
        users: {
          take: userPaginationInput.limit,
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
          limit: userPaginationInput.limit,
          count: users.length,
        },
      })
    }

    return {
      items: groupsUsersPaginated,
      pageInfo: {
        skip: pageInfoInput.skip,
        limit: pageInfoInput.limit,
        count: groupsCount,
      },
    }
  }

  async updateGroup(updateGroupInput: UpdateGroupInput): Promise<Group> {
    const {
      currentSeasonId,
      id,
      seasons: topics,
      users,
      head,
      headId,
      ...groupData
    } = updateGroupInput
    const queryData = groupData as any
    if (users) {
      queryData.users = {
        connect: users,
      }
    }
    if (topics) {
      queryData.seasonTopics = {
        connectOrCreate: topics.map((topic) => {
          return {
            where: {
              seasonId_topicId: {
                groupId: id,
                seasonId: currentSeasonId,
              },
            },
            create: {
              season: {
                connect: {
                  id: currentSeasonId,
                },
              },
            },
          }
        }),
      }
    }
    if (head || headId) {
      queryData.head = {
        connect: {
          id: head.id || headId,
        },
      }
    }

    return this.prismaService.group.update({
      where: { id: id },
      data: queryData,
      include: {
        seasons: {
          include: {
            topics: {
              include: {
                problems: true,
              },
            },
          },
        },
        users: true,
        head: true,
      },
    })
  }

  async deleteGroup(id: string): Promise<Group> {
    return this.prismaService.group.delete({
      where: { id },
    })
  }

  async getGroupsStat(
    pageInfoInput?: PageInfoInput,
  ): Promise<GroupStatResponsePage<GroupStatResponse>> {
    const groupStatResponses: GroupStatResponse[] = []
    const topics = await this.prismaService.topic.findMany({
      select: {
        id: true,
      },
    })
    if (!topics) {
      throw new NotFoundException(`No topics found`)
    }
    const groupCount = (await this.prismaService.group.findMany({})).length
    const groups = await this.prismaService.group.findMany({
      skip: pageInfoInput.skip,
      take: pageInfoInput.limit,
      include: {
        users: {
          select: {
            id: true,
          },
          include: {
            seasonTopicProblems: {
              select: {
                attempts: true,
                solved: true,
                timeDedicated: true,
              },
            },
          },
        },
        seasons: {
          select: {
            isActive: true,
          },
          include: {
            topics: {
              include: {
                problems: {
                  select: {
                    problemId: true,
                  },
                  include: {
                    problem: true,
                  },
                },
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
      groups[i].users.forEach((u) => {
        u.seasonTopicProblems.forEach((g) => {
          if (g.solved) numberOfAcceptedSubmissions += 1
          numberOfWrongSubmissions += g.attempts
          totalTimeDedicated += g.timeDedicated
        })
      })
      groups[i].seasons.forEach((s) => {
        if (s.isActive) numberOfTopicsCovered += s.topics.length
        s.topics.forEach((t) => {
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
        topicsCoverage: topics.length
          ? (numberOfTopicsCovered / topics.length) * 100
          : 0,
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
        skip: pageInfoInput.skip,
        limit: pageInfoInput.limit,
        count: groupCount,
      },
    }
  }
}
