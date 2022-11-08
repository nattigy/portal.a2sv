import { Injectable, NotFoundException } from '@nestjs/common'
import { RoleEnum, SeasonTopicProblemUser, Status, User } from '@prisma/client'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import * as bcrypt from 'bcrypt'
import { Parent, registerEnumType } from '@nestjs/graphql'
import { PrismaService } from '../prisma.service'
import { ComfortLevel } from './entities/comfort-level.enum'
import { GroupsService } from '../group/groups.service'
import {
  StudentStat,
  TopicCoverageStat,
  TopicStudentStatInput,
} from './dto/user-dtos'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import {
  PaginationOutput,
  PaginationUser,
} from '../common/page/pagination-info'

export enum StatTimeRange {
  MONTH,
  WEEK,
  ALL,
}

type sortComparator = (
  a: User & { seasonTopicProblems: SeasonTopicProblemUser[] },
  b: User & { seasonTopicProblems: SeasonTopicProblemUser[] },
) => number

registerEnumType(StatTimeRange, { name: 'StatTimeRange' })

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly groupService: GroupsService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { email, password } = createUserInput

    const foundUser = await this.prismaService.user.findFirst({
      include: {
        group: true,
        headToGroup: true,
        userProfile: true,
        seasonTopicProblems: true,
        topics: {
          include: {
            topic: true,
          },
        },
      },
      where: { email },
    })

    if (foundUser) throw new Error('Email is already in use')

    const saltOrRounds = 10
    const hash = await bcrypt.hash(password, saltOrRounds)

    return this.prismaService.user.create({
      data: {
        email,
        password: hash,
        status: Status.ACTIVE,
        role: createUserInput.role,
        updatedAt: new Date().toISOString(),
      },
      include: {
        group: true,
        userProfile: true,
        headToGroup: true,
        seasonTopicProblems: true,
        topics: {
          include: {
            topic: true,
          },
        },
      },
    })
  }

  async findAll(
    params: {
      skip?: number
      take?: number
      status?: Status
      email?: string
      groupId?: string
      role?: RoleEnum
    },
    pageInfoInput?: PaginationInfoInput,
  ): Promise<PaginationOutput<User>> {
    const { status, email, groupId, role } = params
    const usersCount = (
      await this.prismaService.user.findMany({
        where: {
          groupId,
          status,
          email,
          role,
        },
      })
    ).length
    const users: User[] = await this.prismaService.user.findMany({
      skip: pageInfoInput?.skip,
      take: pageInfoInput?.take,
      where: {
        groupId,
        status,
        email,
        role,
      },
      include: {
        group: true,
        userProfile: true,
        headToGroup: true,
        seasonTopicProblems: true,
        topics: {
          include: {
            topic: true,
          },
        },
      },
    })

    return {
      items: users,
      pageInfo: {
        skip: pageInfoInput?.skip,
        take: pageInfoInput?.take,
        count: usersCount,
      },
    }
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      include: {
        group: true,
        userProfile: true,
        headToGroup: true,
        seasonTopicProblems: true,
        topics: {
          include: {
            topic: true,
          },
        },
      },
      where: {
        id: id,
      },
    })
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  async getRole(@Parent() user: User) {
    return this.prismaService.role.findFirst({ where: { id: '1' } })
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const { id, ...updates } = updateUserInput
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: updates,
      include: {
        headToGroup: true,
        userProfile: true,
      },
    })
  }

  async remove(id: string): Promise<User | null> {
    return await this.prismaService.user.delete({
      where: { id },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findFirst({
      where: { email },
      include: {
        headToGroup: true,
        userProfile: true,
        topics: {
          include: {
            topic: true,
          },
        },
      },
    })
  }

  async findById(id: string) {
    return await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      include: {
        headToGroup: true,
        userProfile: true,
        topics: {
          include: {
            topic: true,
          },
        },
      },
    })
  }

  async updateComfortLevel(
    topicId: string,
    userId: string,
    comfortLevel: ComfortLevel,
  ) {
    return await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        topics: {
          upsert: {
            where: {
              userId_topicId: {
                userId: userId,
                topicId: topicId,
              },
            },
            update: {
              comfortLevel: comfortLevel,
            },
            create: {
              topicId: topicId,
              comfortLevel: comfortLevel,
            },
          },
        },
      },
      include: {
        topics: {
          include: {
            topic: true,
          },
        },
      },
    })
  }

  async studentStats(id: string): Promise<StudentStat> {
    const user = await this.findById(id)
    if (!user) {
      throw new NotFoundException(`User with ${id} not found`)
    }
    const groupId = user.groupId
    if (!groupId) {
      throw new NotFoundException(`Group for User with ${id} not found`)
    }
    const group = await this.groupService.group(groupId)

    const users = await this.prismaService.user.findMany({
      where: {
        role: RoleEnum.STUDENT,
        groupId: user.groupId,
      },
      include: {
        seasonTopicProblems: true,
      },
    })

    const monthAgo = new Date()
    monthAgo.setMonth(monthAgo.getMonth() - 1)
    const weekAgo = new Date()
    weekAgo.setHours(weekAgo.getHours() - 24 * 7)

    function getSortFunction(
      timeRange: StatTimeRange = StatTimeRange.MONTH,
    ): sortComparator {
      const after = new Date()

      function solvedCounter(
        // first entry all time count, 2nd entry within month count, and 3rd entry within week count
        previous: number,
        current: SeasonTopicProblemUser,
      ) {
        if (current.solved) {
        }
        return previous
      }

      switch (timeRange) {
        case StatTimeRange.WEEK:
          after.setHours(after.getHours() - 24 * 7)
          break
        case StatTimeRange.MONTH:
          after.setMonth(after.getMonth() - 1)
          break
        case StatTimeRange.ALL:
          after.setMonth(after.getMonth() - 12)
      }
      const comparator = (
        a: User & { seasonTopicProblems: SeasonTopicProblemUser[] },
        b: User & { seasonTopicProblems: SeasonTopicProblemUser[] },
      ) => {
        const cnt1 = a.seasonTopicProblems.reduce(solvedCounter, 0)
        const cnt2 = b.seasonTopicProblems.reduce(solvedCounter, 0)
        if (cnt1 > cnt2) {
          return 1
        } else if (cnt1 < cnt2) {
          return -1
        }
        return 0
      }
      return comparator
    }

    function sortFunction(
      a: User & { seasonTopicProblems: SeasonTopicProblemUser[] },
      b: User & { seasonTopicProblems: SeasonTopicProblemUser[] },
    ): number {
      function solvedCounter(
        // first entry all time count, 2nd entry within month count, and 3rd entry within week count
        previous: [number, number, number],
        current: SeasonTopicProblemUser,
      ) {
        if (current.solved) {
          previous[0]++
          if (current.updatedAt >= monthAgo) {
            previous[1]++
            previous[2]++
          }
          if (current.updatedAt >= weekAgo) {
            previous[2]++
          }
        }
        return previous
      }

      const cnt1 = a.seasonTopicProblems.reduce(solvedCounter, [0, 0, 0])
      const cnt2 = b.seasonTopicProblems.reduce(solvedCounter, [0, 0, 0])
      if (cnt1 > cnt2) {
        return 1
      } else if (cnt1 < cnt2) {
        return -1
      }
      return 0
    }

    function getRank(comparator): number {
      users.sort(comparator)

      const userIndex = users.findIndex(
        (curUser: User & { seasonTopicProblems: SeasonTopicProblemUser[] }) =>
          user.id == curUser.id,
      )
      if (userIndex < 0) {
        throw new NotFoundException(`User with id ${user.id} not found`)
      }
      return userIndex + 1
    }

    const monthlyRank = getRank(getSortFunction(StatTimeRange.MONTH))
    const weeklyRank = getRank(getSortFunction(StatTimeRange.WEEK))
    const allTimeRank = getRank(getSortFunction(StatTimeRange.ALL))
    const totalUsers = users.length

    const seasons = group.seasons

    let numberOfCorrectSubmissions = 0
    let totalTimeDedicated = 0
    let totalAttempts = 0
    let unableToSolve = 0
    let uncomfortablity = 100
    let acceptanceRate = 0
    let easyCount = 0
    let mediumCount = 0
    let hardCount = 0

    for (const season of seasons) {
      for (const topic of season.topics) {
        for (const p of topic.problems) {
          for (const userProblem of p.users) {
            if (userProblem.userId === id) {
              if (userProblem.solved) {
                numberOfCorrectSubmissions++
                switch (
                  userProblem.seasonTopicProblem.problem.difficulty.toUpperCase()
                ) {
                  case 'EASY':
                    easyCount++
                    break
                  case 'HARD':
                    hardCount++
                    break
                  default:
                    mediumCount++
                }
              }
              totalAttempts += userProblem.attempts
              totalTimeDedicated += userProblem.timeDedicated
              if (userProblem.needHelp) unableToSolve++
            }
          }
        }
      }
    }
    if (numberOfCorrectSubmissions) {
      uncomfortablity = (unableToSolve / numberOfCorrectSubmissions) * 100
    }

    const numberOfIncorrectSubmissions =
      totalAttempts - numberOfCorrectSubmissions
    if (totalAttempts) {
      acceptanceRate = (numberOfCorrectSubmissions / totalAttempts) * 100
    }

    return {
      acceptanceRate,
      numberOfCorrectSubmissions,
      numberOfIncorrectSubmissions,
      totalTimeDedicated,
      uncomfortablity,
      easyCount,
      mediumCount,
      hardCount,
      weeklyRank,
      monthlyRank,
      allTimeRank,
      totalUsers,
    } as StudentStat
  }

  async studentTopicStats({
    studentId,
    seasonId,
  }: TopicStudentStatInput): Promise<TopicCoverageStat> {
    const eachTopicCoverageStat = []
    let totalTopicCoverage = 0
    let totalNumberOfTopics = 0
    let sumOfEachTopicsCoverage = 0
    const user = await this.findById(studentId)
    const group = await this.groupService.group(user.groupId)
    const seasonIndex = group.seasons.findIndex((s, index) => s.id === seasonId)
    if (seasonIndex == -1) {
      throw new NotFoundException(`Season with ${seasonId} not found`)
    }
    const season = group.seasons[seasonIndex]
    let unableToSolve = 0
    let totalQuestions = 0
    let totalNotSolved = 0

    for (const seasonTopic of season.topics) {
      const totalTopicQuestions = seasonTopic.problems?.length
      let numberOfSolvedProblems = 0
      totalNumberOfTopics++
      for (const problem of seasonTopic.problems) {
        for (const userProblem of problem.users) {
          if (userProblem.userId === studentId) {
            if (userProblem.solved) numberOfSolvedProblems++
            if (userProblem.needHelp) unableToSolve++
          }
        }
      }
      totalQuestions += totalTopicQuestions
      totalNotSolved += totalTopicQuestions - numberOfSolvedProblems

      eachTopicCoverageStat.push({
        topicId: seasonTopic.topicId,
        questionCoverage: totalQuestions
          ? (numberOfSolvedProblems / totalTopicQuestions) * 100
          : 0,
        topicCoverage: (numberOfSolvedProblems / totalTopicQuestions) * 100,
      })
      sumOfEachTopicsCoverage += eachTopicCoverageStat[seasonTopic.topicId]
    }

    totalTopicCoverage = sumOfEachTopicsCoverage / totalNumberOfTopics
    const uncomfortability =
      (unableToSolve / (totalQuestions - totalNotSolved)) * 100
    return {
      eachTopicCoverageStat,
      totalTopicCoverage,
      uncomfortability,
    }
  }
}
