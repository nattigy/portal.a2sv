import { Injectable } from '@nestjs/common'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateUserContestInput } from './dto/update-user-contest.input'
import { UserContest } from './entities/user-contest.entity'
import { PaginationUserContest } from '../common/page/pagination-info'
import { FilterGroupContestUsersInput } from './dto/filter-group-contest-users.input'
import { UserContestProblemStatus } from '@prisma/client'
import { UserContestProblem } from '../user-contest-problem/entities/user-contest-problem.entity'

@Injectable()
export class UserContestService {
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

  async findOne(userId: string, contestId: string): Promise<UserContest> {
    const userContest: UserContest = await this.prismaService.userContest.findUnique({
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
            groupContests: true,
          },
        },
      },
    })
    if (userContest !== null && userContest !== undefined) {
      userContest.contestAttended = userContest?.userContestProblems?.length > 0
      for (const problem of userContest.userContestProblems) {
        if (problem.status == UserContestProblemStatus.SOLVED) userContest.problemsSolved += 1
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
          groupContests: true,
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
          status: UserContestProblemStatus.UNATTEMPTED,
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
        contest
      }
    }
    return userContest
  }

  async findAll(
    userId: string,
    { skip, take }: PaginationInfoInput = {
      take: 50,
      skip: 0,
    },
  ): Promise<PaginationUserContest> {
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
    const userContests: UserContest[] = []
    for (const groupContest of groupContests) {
      const userContest = await this.findOne(userId, groupContest.contestId)
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
    { skip, take }: PaginationInfoInput = { take: 50, skip: 0 },
  ): Promise<PaginationUserContest> {
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
    const userContests: UserContest[] = []
    for (const user of users) {
      const userContest = await this.findOne(user.id, contestId)
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
  }: UpdateUserContestInput): Promise<UserContest> {
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
      },
      update: updates,
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

  async remove(id: string): Promise<number> {
    return 0
  }
}
