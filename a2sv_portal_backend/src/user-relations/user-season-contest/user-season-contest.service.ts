import { Injectable } from '@nestjs/common'
import { PaginationInput } from '../../common/page/pagination.input'
import { PrismaService } from '../../prisma/prisma.service'
import { UpdateUserContestInput, UserContestId } from './dto/update-user-contest.input'
import { UserSeasonContest } from './entities/user-season-contest.entity'
import { PaginationUserSeasonContest } from '../../common/page/pagination-info'
import { FilterGroupContestUsersInput } from './dto/filter-group-contest-users.input'
import { UserContestProblemStatus } from '@prisma/client'
import { UserContestProblem } from '../user-season-contest-problem/entities/user-season-contest-problem.entity'

@Injectable()
export class UserSeasonContestService {
  constructor(private readonly prismaService: PrismaService) {}

  // async create(createUserContestInput: CreateUserContestInput): Promise<UserContest> {
  //   return this.prismaService.userContest.create({
  //     data: createUserContestInput,
  //     include: {
  //       userContestProblems: {
  //         include: {
  //           problem: true,
  //         },
  //       },
  //       user: true,
  //       contest: {
  //         include: {
  //           problems: true,
  //           groupContests: true,
  //         },
  //       },
  //     },
  //   })
  // }

  async findOne({ userId, contestId }: UserContestId): Promise<UserSeasonContest> {
    const userContest: UserSeasonContest = await this.prismaService.userContest.findUnique({
      where: {
        userId_contestId: {
          userId,
          contestId,
        },
      },
      include: {
        userContestProblems: {
          include: {
            problem: true,
          },
        },
        user: true,
        contest: {
          include: {
            problems: true,
            groupContests: {
              where: {
                contestId,
              },
            },
          },
        },
      },
    })
    if (userContest !== null && userContest !== undefined) {
      userContest.contestAttended = userContest?.userContestProblems?.length > 0
      for (const problem of userContest.userContestProblems) {
        if (problem.status == UserContestProblemStatus.SOLVED_IN_CONTEST)
          userContest.problemsSolved += 1
        userContest.wrongSubmissions += problem.numberOfAttempts
        userContest.timeSpent += problem.numberOfMinutes
      }
    } else {
      const user = await this.prismaService.user.findUnique({ where: { id: userId } })
      const contest = await this.prismaService.contest.findUnique({
        where: {
          id: contestId,
        },
        include: {
          problems: true,
          groupContests: {
            where: {
              contestId,
            },
          },
        },
      })
      const userContestProblems: UserContestProblem[] = []
      for (const problem of contest.problems) {
        const userContestProblem: UserContestProblem = {
          contestId,
          userId,
          problemId: problem.id,
          numberOfMinutes: 0,
          numberOfAttempts: 0,
          status: UserContestProblemStatus.NOT_SOLVED,
          problem: problem,
          user,
          contest,
        }
        userContestProblems.push(userContestProblem)
      }
      return {
        contestId,
        userId,
        contestAttended: false,
        problemsSolved: 0,
        timeSpent: 0,
        wrongSubmissions: 0,
        rank: 0,
        userContestProblems,
        user,
        contest,
      }
    }
    return userContest
  }

  async findAll(
    userId: string,
    { skip, take }: PaginationInput = {
      take: 50,
      skip: 0,
    },
  ): Promise<PaginationUserSeasonContest> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    })
    const count = (
      await this.prismaService.groupContest.findMany({
        where: {
          groupId: user.groupId,
        },
      })
    ).length
    const groupContests = await this.prismaService.groupContest.findMany({
      skip,
      take,
      where: {
        groupId: user.groupId,
      },
    })
    const userContests: UserSeasonContest[] = []
    for (const groupContest of groupContests) {
      const userContest = await this.findOne({ userId, contestId: groupContest.contestId })
      userContests.push(userContest)
    }
    return {
      items: userContests,
      pageInfo: {
        skip,
        take,
        count,
      },
    }
  }

  async groupContestUsers(
    { groupId, contestId }: FilterGroupContestUsersInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationUserSeasonContest> {
    const count = (
      await this.prismaService.user.findMany({
        where: {
          groupId,
        },
      })
    ).length
    const users = await this.prismaService.user.findMany({
      skip,
      take,
      where: {
        groupId,
      },
    })
    const userContests: UserSeasonContest[] = []
    for (const user of users) {
      const userContest = await this.findOne({ userId: user.id, contestId })
      userContests.push(userContest)
    }
    return {
      items: userContests,
      pageInfo: {
        skip,
        take,
        count,
      },
    }
  }

  async update({
    userId,
    contestId,
    ...updates
  }: UpdateUserContestInput): Promise<UserSeasonContest> {
    const problems = (
      await this.prismaService.contest.findUnique({
        where: {
          id: contestId,
        },
        include: {
          problems: true,
        },
      })
    ).problems
    return this.prismaService.userContest.upsert({
      where: {
        userId_contestId: {
          userId,
          contestId,
        },
      },
      create: {
        contest: {
          connect: {
            id: contestId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        userContestProblems: {
          createMany: {
            skipDuplicates: true,
            data: problems.map(p => ({
              userContestUserId: userId,
              userContestContestId: contestId,
              problemId: p.id,
              numberOfAttempts: 0,
              numberOfMinutes: 0,
              status: UserContestProblemStatus.NOT_SOLVED,
            })),
          },
        },
      },
      update: {
        userId,
        contestId,
      },
      include: {
        userContestProblems: {
          include: {
            problem: true,
          },
        },
        user: true,
        contest: {
          include: {
            problems: true,
            groupContests: true,
          },
        },
      },
    })
  }

  async remove({ userId, contestId }: UserContestId): Promise<number> {
    try {
      await this.prismaService.userContest.delete({
        where: {
          userId_contestId: {
            userId,
            contestId,
          },
        },
      })
    } catch (e) {
      console.log(`Fail to delete user contest with id ${userId}`, ' : ', e)
      throw new Error(`Fail to delete user contest with id ${userId}`)
    }
    return 1
  }
}
