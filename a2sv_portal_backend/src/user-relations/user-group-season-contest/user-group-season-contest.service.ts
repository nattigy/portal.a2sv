import { Injectable } from '@nestjs/common'
import { PaginationInput } from '../../common/page/pagination.input'
import { PrismaService } from '../../prisma/prisma.service'
import { PaginationUserGroupSeasonContest } from '../../common/page/pagination-info'
import { UserGroupSeasonContestId } from './dto/create-user-group-season-contest.input'
import { UserGroupSeasonContestRepository } from './user-group-season-contest.repository'
import { FilterUserGroupSeasonContestInput } from './dto/filter-user-group-season-contest.input'
import { UserGroupSeasonContest } from './entities/user-group-season-contest.entity'
import { UpdateUserGroupSeasonContestInput } from './dto/update-user-group-season-contest.input'

@Injectable()
export class UserGroupSeasonContestService {
  constructor(
    private readonly userGroupSeasonContestRepository: UserGroupSeasonContestRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async userGroupSeasonContest({
    userId,
    seasonId,
    contestId,
    groupId,
  }: UserGroupSeasonContestId): Promise<UserGroupSeasonContest> {
    return this.userGroupSeasonContestRepository.findOne({
      userId_groupId_seasonId_contestId: { userId, groupId, seasonId, contestId },
    })
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
  }

  async userGroupSeasonContests(
    filterUserGroupSeasonContestInput: FilterUserGroupSeasonContestInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationUserGroupSeasonContest> {
    const count = await this.userGroupSeasonContestRepository.count(
      filterUserGroupSeasonContestInput,
    )
    const UserGroupSeasonContests: UserGroupSeasonContest[] =
      await this.userGroupSeasonContestRepository.findAll({
        skip,
        take,
        where: filterUserGroupSeasonContestInput,
      })
    return {
      items: UserGroupSeasonContests,
      pageInfo: { skip, take, count },
    }
  }

  async updateUserGroupSeasonContest({
    id,
    ...updates
  }: UpdateUserGroupSeasonContestInput): Promise<UserGroupSeasonContest> {
    const { userId, seasonId, contestId, groupId } = id
    return this.prismaService.userGroupSeasonContest.upsert({
      where: {
        userId_groupId_seasonId_contestId: { userId, groupId, seasonId, contestId },
      },
      create: {
        userGroupSeason: {
          connect: {
            userId_groupId_seasonId: { userId, groupId, seasonId },
          },
        },
        groupSeasonContest: {
          connect: { groupId_seasonId_contestId: { groupId, seasonId, contestId } },
        },
      },
      update: updates,
      include: {
        userGroupSeasonContestProblems: {
          include: {
            problem: { include: { tags: true } },
          },
        },
      },
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
    })
  }

  async removeUserGroupSeasonContest({
    userId,
    seasonId,
    contestId,
    groupId,
  }: UserGroupSeasonContestId): Promise<number> {
    try {
      await this.userGroupSeasonContestRepository.remove({
        userId_groupId_seasonId_contestId: {
          userId,
          seasonId,
          contestId,
          groupId,
        },
      })
    } catch (e) {
      console.log(`Fail to delete user contest with id ${userId}`, ' : ', e)
      throw new Error(`Fail to delete user contest with id ${userId}`)
    }
    return 1
  }
}
