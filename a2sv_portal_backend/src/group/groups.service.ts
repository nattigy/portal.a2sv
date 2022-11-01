import {Injectable, NotFoundException} from '@nestjs/common'
import {CreateGroupInput} from './dto/create-group.input'
import {Group} from './entities/group.entity'
import {UpdateGroupInput} from './dto/update-group.input'
import {PrismaService} from '../prisma.service'
import {Field, InputType, Int} from '@nestjs/graphql'
import {GroupStatResponse} from "./dto/group-stat-response";
import {GroupWhereInput} from "./dto/find-group.input";

@Injectable()
export class GroupsService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async createGroup(createGroupInput: CreateGroupInput): Promise<Group> {
    return this.prismaService.group.create({
      include: {
        users: true,
        head: true,
        seasons: {
          include: {
            topics: true
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
            topics: true,
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

  async getGroups(filter?: GroupWhereInput): Promise<Group[]> {
    const {skip, take, topicId, ...where} = filter || {}
    return this.prismaService.group.findMany({
      skip,
      take,
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
              }
            }
          },
        },
      },
    })
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
      where: {id: id},
      data: queryData,
      include: {
        seasons: {
          include: {
            topics: {
              include: {
                problems: true
              }
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
      where: {id},
    })
  }

  async getGroupsStat(): Promise<GroupStatResponse[]> {
    const groupStatResponses: GroupStatResponse[] = []
    const topics = await this.prismaService.topic.findMany({
      select: {
        id: true
      }
    })
    if (!topics) {
      throw new NotFoundException(`No topics found`)
    }
    const groups = await this.prismaService.group.findMany({
      include: {
        users: {
          include: {
            seasonTopicProblems: {
              select: {
                attempts: true,
                solved: true,
                timeDedicated: true,
              }
            }
          }
        },
        seasons: {
          include: {
            topics: {
              include: {
                problems: {
                  include: {
                    problem: true,
                  },
                },
              }
            },
          },
        },
        groupContests: true,
      }
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
          if (g.solved)
            numberOfAcceptedSubmissions += 1
          numberOfWrongSubmissions += g.attempts
          totalTimeDedicated += g.timeDedicated
        })
      })
      groups[i].seasons.forEach(s => {
        if (s.isActive)
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
        topicsCoverage: topics.length ? (numberOfTopicsCovered / topics.length) * 100 : 0,
        numberOfAcceptedSubmissions: numberOfAcceptedSubmissions,
        numberOfWrongSubmissions: numberOfWrongSubmissions,
        totalTimeDedicated: totalTimeDedicated,
        numberOfProblems: numberOfProblems,
        contestsAttended: contestsAttended,
        // rank: groups[i].id,
      })
    }
    return groupStatResponses
  }
}
