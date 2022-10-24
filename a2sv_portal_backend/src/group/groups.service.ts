import {Injectable, NotFoundException} from '@nestjs/common'
import {CreateGroupInput} from './dto/create-group.input'
import {Group} from './entities/group.entity'
import {UpdateGroupInput} from './dto/update-group.input'
import {PrismaService} from '../prisma.service'
import {GroupWhereInput} from './dto/find-group.input'
import {GroupStatResponse} from "./dto/group-stat-response";

@Injectable()
export class GroupsService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async createGroup(createGroupInput: CreateGroupInput): Promise<Group> {
    return this.prismaService.group.create({
      include: {
        users: true,
        head: true,
        seasonTopics: {
          include: {
            topic: true,
            season: true
          },
        },
      },
      data: createGroupInput,
    })
  }

  async getGroupById(id: number): Promise<Group> {
    const group = await this.prismaService.group.findUnique({
      include: {
        users: true,
        head: true,
        seasonTopics: {
          include: {
            season: true,
            topic: true,
            problems: {
              include: {
                problem: true,
              },
            },
          },
        },
      },
      where: {id},
    })
    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`)
    }
    return group
  }

  async getGroups(filter?: GroupWhereInput): Promise<Group[]> {
    const {skip, take, seasonId, topicId, ...where} = filter || {}
    return this.prismaService.group.findMany({
      skip,
      take,
      where: {
        ...where,
        seasonTopics: {
          some: {
            seasonId,
            topicId
          }
        }
      },
      include: {
        users: true,
        head: true,
        seasonTopics: {
          include: {
            season: true,
            topic: true,
            problems: {
              include: {
                problem: true,
              },
            },
          },
        },
      },
    })
  }

  async updateGroup(updateGroupInput: UpdateGroupInput): Promise<Group> {
    const {currentSeasonId, id, seasonTopics: topics, users, head, headId, ...groupData} =
      updateGroupInput
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
              groupId_topicId_seasonId: {
                groupId: id,
                topicId: topic.topicId,
                seasonId: currentSeasonId,
              },
            },
            create: {
              season: {
                connect: {
                  id: currentSeasonId,
                },
              },
              topic: {
                connect: {
                  id: topic.topicId,
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
        seasonTopics: {
          include: {
            season: true,
            topic: true,
            problems: {
              include: {
                problem: true,
              },
            },
          },
        },
        users: true,
        head: true,
      },
    })
  }

  async deleteGroup(id: number): Promise<Group> {
    return this.prismaService.group.delete({
      where: {id},
    })
  }

  async getGroupsStat(): Promise<GroupStatResponse[]> {
    // Topics_Coverage = sum_of_each_topic’s_coverage_in_percent / total_topics
    /*
        id: number
        name: string
        createdAt: Date
        country?: string
        school?: string
        numberOfStudents: number
        numberOfTopicsCovered: number
        topicsCoverage: number
        numberOfAcceptedSubmissions: number
        numberOfWrongSubmissions: number
        totalTimeDedicated: number
        rank: number
        contestsAttended: number
        numberOfProblems: number
    * */
    const groupStatResponses: GroupStatResponse[] = []
    const topics = await this.prismaService.topic.findMany({
      select: {
        id: true
      }
    })
    const groups = await this.prismaService.group.findMany({
      include: {
        users: {
          select: {
            id: true
          },
          include: {
            groupTopicSeasonProblems: {
              select: {
                attempts: true,
                solved: true,
                timeDedicated: true,
              }
            }
          }
        },
        seasonTopics: {
          include: {
            topic: true,
            problems: {
              select: {
                problemId: true
              },
              include: {
                problem: true,
              },
            },
          },
        },
      }
    })
    for (let i = 0; i < groups.length; i++) {
      let numberOfAcceptedSubmissions = 0
      let numberOfWrongSubmissions = 0
      let totalTimeDedicated = 0
      groups[i].users.forEach(u => {
        u.groupTopicSeasonProblems.forEach(g => {
          if (g.solved)
            numberOfAcceptedSubmissions += 1
          numberOfWrongSubmissions += g.attempts
          totalTimeDedicated += g.timeDedicated
        })
      })
      groupStatResponses.push({
        id: groups[i].id,
        name: groups[i].name,
        createdAt: groups[i].createdAt,
        country: groups[i].country,
        school: groups[i].school,
        numberOfStudents: groups[i].users?.length,
        numberOfTopicsCovered: groups[i].seasonTopics.length,
        topicsCoverage: (groups[i].seasonTopics.length / topics.length) * 100,
        numberOfAcceptedSubmissions: numberOfAcceptedSubmissions,
        numberOfWrongSubmissions: numberOfWrongSubmissions,
        totalTimeDedicated: totalTimeDedicated,
        contestsAttended: groups[i].id,
        numberOfProblems: groups[i].id,
        rank: groups[i].id,
      })
    }
    return groupStatResponses
  }
}
