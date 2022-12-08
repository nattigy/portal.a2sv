import { Injectable } from '@nestjs/common'
import { PaginationInput } from '../../common/page/pagination.input'
import { PrismaService } from '../../prisma/prisma.service'
import { UserSeasonContest } from './entities/user-season-contest.entity'
import { PaginationUserSeasonContest } from '../../common/page/pagination-info'
import { UserSeasonContestProblem } from '../user-season-contest-problem/entities/user-season-contest-problem.entity'
import { UserSeasonContestId } from './dto/create-user-season-contest.input'
import { UserSeasonContestRepository } from './user-season-contest.repository'
import { UserContestProblemStatusEnum } from '@prisma/client'
import { FilterUserSeasonContestInput } from './dto/filter-user-season-contest.input'
import { UpdateUserSeasonContestInput } from './dto/update-user-season-contest.input'

@Injectable()
export class UserSeasonContestService {
  constructor(
    private readonly userSeasonContestRepository: UserSeasonContestRepository,
    private readonly prismaService: PrismaService,
  ) {
  }

  async userContest({ userId, seasonId, contestId }: UserSeasonContestId): Promise<UserSeasonContest> {
    const userSeasonContest: UserSeasonContest = await this.userSeasonContestRepository.findOne({
      userId_seasonId_contestId: { userId, seasonId, contestId },
    })
    if (userSeasonContest !== null && userSeasonContest !== undefined) {
      userSeasonContest.contestAttended = userSeasonContest?.userSeasonContestProblems?.length > 0
      for (const problem of userSeasonContest.userSeasonContestProblems) {
        if (problem.status == UserContestProblemStatusEnum.SOLVED_IN_CONTEST)
          userSeasonContest.problemsSolved += 1
        userSeasonContest.wrongSubmissions += problem.numberOfAttempts
        userSeasonContest.timeSpent += problem.numberOfMinutes
      }
    } else {
      const user = await this.prismaService.user.findUnique({ where: { id: userId } })
      const contest = await this.prismaService.contest.findUnique({
        where: {
          id: contestId,
        },
      })
      const userSeasonContestProblems: UserSeasonContestProblem[] = []
      // for (const problem of contest.problems) {
      //   const userSeasonContestProblem: UserSeasonContestProblem = {
      //     contestId,
      //     userId,
      //     problemId: problem.id,
      //     numberOfMinutes: 0,
      //     numberOfAttempts: 0,
      //     status: UserSeasonContestProblemStatus.NOT_SOLVED,
      //     problem,
      //     user,
      //     contest,
      //   }
      //   userSeasonContestProblems.push(userSeasonContestProblem)
      // }
      // return {
      //   contestId,
      //   userId,
      //   contestAttended: false,
      //   problemsSolved: 0,
      //   timeSpent: 0,
      //   wrongSubmissions: 0,
      //   rank: 0,
      //   userSeasonContestProblems,
      // }
    }
    return userSeasonContest
  }

  async userContests(
    { userId, seasonId, contestId }: FilterUserSeasonContestInput,
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
    // const count = (
    //   await this.prismaService.groupContest.findMany({
    //     where: {
    //       groupId: user.groupId,
    //     },
    //   })
    // ).length
    // const groupContests = await this.prismaService.groupContest.findMany({
    //   skip,
    //   take,
    //   where: {
    //     groupId: user.groupId,
    //   },
    // })
    // const userSeasonContests: UserSeasonContest[] = []
    // for (const groupContest of groupContests) {
    //   const userSeasonContest = await this.findOne({ userId, contestId: groupContest.contestId })
    //   userSeasonContests.push(userSeasonContest)
    // }
    return {
      items: [],
      pageInfo: {
        skip,
        take, count: 0,
      },
    }
  }

  async updateUserContest({ id, ...updates }: UpdateUserSeasonContestInput): Promise<UserSeasonContest> {
    const { userId, seasonId, contestId } = id
    return this.prismaService.userSeasonContest.upsert({
      where: { userId_seasonId_contestId: id },
      create: {
        // seasonId, userId, contestId,
        seasonContest: {
          connect: {
            seasonId_contestId: { seasonId, contestId },
          },
        },
        userSeason: {
          connect: {
            userId_seasonId: { userId, seasonId },
          },
        },
        userSeasonContestProblems: {
          createMany: {
            skipDuplicates: true,
            data: [],
          },
        },
      },
      update: updates,
      include: {
        seasonContest: {
          include: {
            season: true,
            contest: {
              include: { problems: { include: { tags: true } } },
            },
          },
        },
        userSeason: {
          include: { user: true, season: true },
        },
        userSeasonContestProblems: {
          include: { problem: { include: { tags: true } } },
        },
      },
    })
  }

  async removeUserSeasonContest({ userId, seasonId, contestId }: UserSeasonContestId): Promise<number> {
    try {
      await this.userSeasonContestRepository.remove({
        userId_seasonId_contestId: {
          userId, seasonId, contestId,
        },
      })
    } catch (e) {
      console.log(`Fail to delete user contest with id ${userId}`, ' : ', e)
      throw new Error(`Fail to delete user contest with id ${userId}`)
    }
    return 1
  }
}
