import { Injectable } from '@nestjs/common'
import { PaginationInput } from '../../common/page/pagination.input'
import { PrismaService } from '../../prisma/prisma.service'
import { PaginationUserGroupSeasonContest } from '../../common/page/pagination-info'
import { UserGroupSeasonContestId } from './dto/create-user-season-contest.input'
import { UserGroupSeasonContestRepository } from './user-season-contest.repository'
import { FilterUserGroupSeasonContestInput } from './dto/filter-user-season-contest.input'

@Injectable()
export class UserGroupSeasonContestService {
  constructor(
    private readonly UserGroupSeasonContestRepository: UserGroupSeasonContestRepository,
    private readonly prismaService: PrismaService,
  ) {}

  // async userContest({ userId, seasonId, contestId }: UserGroupSeasonContestId): Promise<UserGroupSeasonContest> {
  //   const UserGroupSeasonContest: UserGroupSeasonContest = await this.UserGroupSeasonContestRepository.findOne({
  //     userId_seasonId_contestId: { userId, seasonId, contestId },
  //   })
  //   if (UserGroupSeasonContest !== null && UserGroupSeasonContest !== undefined) {
  //     UserGroupSeasonContest.contestAttended = UserGroupSeasonContest?.UserGroupSeasonContestProblems?.length > 0
  //     for (const problem of UserGroupSeasonContest.UserGroupSeasonContestProblems) {
  //       if (problem.status == UserContestProblemStatusEnum.SOLVED_IN_CONTEST)
  //         UserGroupSeasonContest.problemsSolved += 1
  //       UserGroupSeasonContest.wrongSubmissions += problem.numberOfAttempts
  //       UserGroupSeasonContest.timeSpent += problem.numberOfMinutes
  //     }
  //   } else {
  //     const user = await this.prismaService.user.findUnique({ where: { id: userId } })
  //     const contest = await this.prismaService.contest.findUnique({
  //       where: {
  //         id: contestId,
  //       },
  //     })
  //     const UserGroupSeasonContestProblems: UserGroupSeasonContestProblem[] = []
  //     // for (const problem of contest.problems) {
  //     //   const UserGroupSeasonContestProblem: UserGroupSeasonContestProblem = {
  //     //     contestId,
  //     //     userId,
  //     //     problemId: problem.id,
  //     //     numberOfMinutes: 0,
  //     //     numberOfAttempts: 0,
  //     //     status: UserGroupSeasonContestProblemStatus.NOT_SOLVED,
  //     //     problem,
  //     //     user,
  //     //     contest,
  //     //   }
  //     //   UserGroupSeasonContestProblems.push(UserGroupSeasonContestProblem)
  //     // }
  //     // return {
  //     //   contestId,
  //     //   userId,
  //     //   contestAttended: false,
  //     //   problemsSolved: 0,
  //     //   timeSpent: 0,
  //     //   wrongSubmissions: 0,
  //     //   rank: 0,
  //     //   UserGroupSeasonContestProblems,
  //     // }
  //   }
  //   return UserGroupSeasonContest
  // }

  async userContests(
    { userId, seasonId, contestId }: FilterUserGroupSeasonContestInput,
    { skip, take }: PaginationInput = {
      take: 50,
      skip: 0,
    },
  ): Promise<PaginationUserGroupSeasonContest> {
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
    // const UserGroupSeasonContests: UserGroupSeasonContest[] = []
    // for (const groupContest of groupContests) {
    //   const UserGroupSeasonContest = await this.findOne({ userId, contestId: groupContest.contestId })
    //   UserGroupSeasonContests.push(UserGroupSeasonContest)
    // }
    return {
      items: [],
      pageInfo: {
        skip,
        take,
        count: 0,
      },
    }
  }

  // async updateUserContest({ id, ...updates }: UpdateUserGroupSeasonContestInput): Promise<UserGroupSeasonContest> {
  //   const { userId, seasonId, contestId } = id
  //   return this.prismaService.UserGroupSeasonContest.upsert({
  //     where: { userId_seasonId_contestId: id },
  //     create: {
  //       // seasonId, userId, contestId,
  //       seasonContest: {
  //         connect: {
  //           seasonId_contestId: { seasonId, contestId },
  //         },
  //       },
  //       UserGroupSeason: {
  //         connect: {
  //           userId_seasonId: { userId, seasonId },
  //         },
  //       },
  //       UserGroupSeasonContestProblems: {
  //         createMany: {
  //           skipDuplicates: true,
  //           data: [],
  //         },
  //       },
  //     },
  //     update: updates,
  //     include: {
  //       seasonContest: {
  //         include: {
  //           season: true,
  //           contest: {
  //             include: { problems: { include: { tags: true } } },
  //           },
  //         },
  //       },
  //       UserGroupSeason: {
  //         include: { user: true, season: true },
  //       },
  //       UserGroupSeasonContestProblems: {
  //         include: { problem: { include: { tags: true } } },
  //       },
  //     },
  //   })
  // }

  async removeUserGroupSeasonContest({
    userId,
    seasonId,
    contestId,
  }: UserGroupSeasonContestId): Promise<number> {
    try {
      await this.UserGroupSeasonContestRepository.remove({
        userId_seasonId_contestId: {
          userId,
          seasonId,
          contestId,
        },
      })
    } catch (e) {
      console.log(`Fail to delete user contest with id ${userId}`, ' : ', e)
      throw new Error(`Fail to delete user contest with id ${userId}`)
    }
    return 1
  }
}
