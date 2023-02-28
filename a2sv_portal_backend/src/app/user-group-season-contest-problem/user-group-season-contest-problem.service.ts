import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { PaginationInput } from '../../common/page/pagination.input'
import { PaginationUserGroupSeasonContestProblem } from '../../common/page/pagination-info'
import { UserGroupSeasonContestProblemRepository } from './user-group-season-contest-problem.repository'
import { FilterUserContestProblemInput } from './dto/filter-user-group-season-contest-problem'
import { UpdateUserGroupSeasonContestProblemInput } from './dto/update-user-group-season-contest-problem.input'
import { UserGroupSeasonContestProblem } from './entities/user-group-season-contest-problem.entity'
import { UserGroupSeasonContestProblemId } from './dto/create-user-group-season-contest-problem.input'

@Injectable()
export class UserGroupSeasonContestProblemService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userGroupSeasonContestProblemRepository: UserGroupSeasonContestProblemRepository,
  ) {
  }

  async userGroupSeasonContestProblems(
    { groupId, ...filterUserGroupSeasonContestProblemInput }: FilterUserContestProblemInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationUserGroupSeasonContestProblem> {
    const count = await this.userGroupSeasonContestProblemRepository.count(
      filterUserGroupSeasonContestProblemInput,
    )
    const UserGroupSeasonContestProblems =
      await this.userGroupSeasonContestProblemRepository.findAll({
        skip,
        take,
        where: filterUserGroupSeasonContestProblemInput,
      })
    return {
      items: UserGroupSeasonContestProblems,
      pageInfo: { skip, take, count },
    }
  }

  // async userGroupSeasonContestProblem({
  //   userId,
  //   contestId,
  //   seasonId,
  //   groupId,
  //   problemId,
  // }: UserGroupSeasonContestProblemId): Promise<UserGroupSeasonContestProblem> {
  //   let userGroupSeasonContestProblem: UserGroupSeasonContestProblem =
  //     await this.userGroupSeasonContestProblemRepository.findOne({
  //       userId_groupId_seasonId_contestId_problemId: {
  //         userId,
  //         contestId,
  //         groupId,
  //         problemId,
  //         seasonId,
  //       },
  //     })
  //   if (
  //     userGroupSeasonContestProblem === null ||
  //     userGroupSeasonContestProblem === undefined
  //   ) {
  //     const contest = await this.prismaService.contest.findUnique({
  //       where: { id: contestId },
  //       include: { problems: { include: { tags: true } } },
  //     })
  //     userGroupSeasonContestProblem = {
  //       contestId,
  //       problemId,
  //       userId,
  //       groupId,
  //       seasonId,
  //       numberOfAttempts: 0,
  //       numberOfMinutes: 0,
  //       status: UserContestProblemStatusEnum.NOT_SOLVED,
  //       problem: contest.problems.filter(p => p.id === problemId)[0],
  //     }
  //   }
  //   return userGroupSeasonContestProblem
  // }

  async updateUserGroupSeasonContestProblem({
                                              seasonId,
                                              contestId,
                                              groupId,
                                              problemId,
                                              userId,
                                              ...updateUserGroupSeasonContestProblemInput
                                            }: UpdateUserGroupSeasonContestProblemInput): Promise<UserGroupSeasonContestProblem> {
    return this.prismaService.userGroupSeasonContestProblem.upsert({
      where: {
        userId_groupId_seasonId_contestId_problemId: {
          seasonId,
          contestId,
          groupId,
          problemId,
          userId,
        },
      },
      create: {
        userGroupSeasonContest: {
          connect: {
            userId_groupId_seasonId_contestId: { userId, groupId, seasonId, contestId },
          },
        },
        contestProblem: { connect: { contestId_problemId: { problemId, contestId } } },
        groupSeasonContestProblem: {
          connect: {
            groupId_seasonId_contestId_problemId: {
              groupId,
              seasonId,
              problemId,
              contestId,
            },
          },
        },
        ...updateUserGroupSeasonContestProblemInput,
      },
      update: {},
      include: {
        contestProblem: { include: { problem: { include: { tags: true } } } },
      },
    })
  }

  async removeUserGroupContestProblem({
                                        userId,
                                        contestId,
                                        problemId,
                                        groupId,
                                        seasonId,
                                      }: UserGroupSeasonContestProblemId) {
    try {
      await this.userGroupSeasonContestProblemRepository.remove({
        userId_groupId_seasonId_contestId_problemId: {
          seasonId,
          groupId,
          contestId,
          problemId,
          userId,
        },
      })
    } catch (e) {
      console.log(`Fail to delete user contest problem with id ${userId}`, ' : ', e)
      throw new Error(`Fail to delete user contest problem with id ${userId}`)
    }
    return 1
  }
}
