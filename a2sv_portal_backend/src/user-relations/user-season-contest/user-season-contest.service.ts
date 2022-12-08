import { Injectable } from '@nestjs/common'
import { PaginationInput } from '../../common/page/pagination.input'
import { PrismaService } from '../../prisma/prisma.service'
import { UserSeasonContest } from './entities/user-season-contest.entity'
import { PaginationUserSeasonContest } from '../../common/page/pagination-info'
import { UserSeasonContestProblem } from '../user-season-contest-problem/entities/user-season-contest-problem.entity'
import { UserSeasonContestId } from './dto/create-user-contest.input'
import { UserSeasonContestRepository } from './user-season-contest.repository'
import { UserContestProblemStatusEnum } from '@prisma/client'

@Injectable()
export class UserSeasonContestService {
  constructor(
    private readonly userSeasonContestRepository: UserSeasonContestRepository,
    private readonly prismaService: PrismaService,
  ) {
  }

  // async create(createUserSeasonContestInput: CreateUserSeasonContestInput): Promise<UserSeasonContest> {
  //   return this.prismaService.userSeasonContest.create({
  //     data: createUserSeasonContestInput,
  //     include: {
  //       userSeasonContestProblems: {
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

  async findOne({ userId, seasonId, contestId }: UserSeasonContestId): Promise<UserSeasonContest> {
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

  // async update({
  //   userId,
  //   contestId,
  //   ...updates
  // }: UpdateUserSeasonContestInput): Promise<UserSeasonContest> {
  //   const problems = (
  //     await this.prismaService.contest.findUnique({
  //       where: {
  //         id: contestId,
  //       },
  //       include: {
  //         problems: true,
  //       },
  //     })
  //   ).problems
  //   return this.prismaService.userSeasonContest.upsert({
  //     where: {
  //       userId_contestId: {
  //         userId,
  //         contestId,
  //       },
  //     },
  //     create: {
  //       contest: {
  //         connect: {
  //           id: contestId,
  //         },
  //       },
  //       user: {
  //         connect: {
  //           id: userId,
  //         },
  //       },
  //       userSeasonContestProblems: {
  //         createMany: {
  //           skipDuplicates: true,
  //           data: problems.map(p => ({
  //             userSeasonContestUserId: userId,
  //             userSeasonContestContestId: contestId,
  //             problemId: p.id,
  //             numberOfAttempts: 0,
  //             numberOfMinutes: 0,
  //             status: UserSeasonContestProblemStatus.NOT_SOLVED,
  //           })),
  //         },
  //       },
  //     },
  //     update: {
  //       userId,
  //       contestId,
  //     },
  //     include: {
  //       userSeasonContestProblems: {
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

  async remove({ userId, seasonId, contestId }: UserSeasonContestId): Promise<number> {
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
