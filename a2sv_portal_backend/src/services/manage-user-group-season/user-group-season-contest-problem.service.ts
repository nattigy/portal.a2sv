import { Injectable } from '@nestjs/common'
import { PaginationUserGroupSeasonContestProblem } from 'src/common/page/pagination-info'
import { PaginationInput } from 'src/common/page/pagination.input'
import { PrismaService } from '../../prisma/prisma.service'
import { UserGroupSeasonContestProblemId } from '../../app/user-group-season-contest-problem/dto/create-user-group-season-contest-problem.input'
import { FilterUserContestProblemInput } from '../../app/user-group-season-contest-problem/dto/filter-user-group-season-contest-problem'
import { UserGroupSeasonContestProblem } from '../../app/user-group-season-contest-problem/entities/user-group-season-contest-problem.entity'
import { UserGroupSeasonContestProblemRepository } from '../../app/user-group-season-contest-problem/user-group-season-contest-problem.repository'
import { UserContestProblemStatusEnum } from '@prisma/client'
import { UpdateUserGroupSeasonContestProblemInput } from '../../app/user-group-season-contest-problem/dto/update-user-group-season-contest-problem.input'

@Injectable()
export class UserGroupSeasonContestProblemService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userGroupSeasonContestProblemRepository: UserGroupSeasonContestProblemRepository,
  ) {}

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

  // async updateUserGroupSeasonContestProblem({
  //   id,
  //   ...updateUserGroupSeasonContestProblemInput
  // }: UpdateUserGroupSeasonContestProblemInput): Promise<UserGroupSeasonContestProblem> {
  //   const { seasonId, problemId, userId, groupId, contestId } = id
  //   return this.prismaService.userGroupSeasonContestProblem.upsert({
  //     where: {
  //       userId_groupId_seasonId_contestId_problemId: {
  //         seasonId,
  //         contestId,
  //         groupId,
  //         problemId,
  //         userId,
  //       },
  //     },
  //     create: {
  //       userGroupSeasonContest: {
  //         connect: {
  //           userId_groupId_seasonId_contestId: { userId, groupId, seasonId, contestId },
  //         },
  //       },
  //       groupSeasonContestProblem: {
  //         connect: {
  //           groupId_seasonId_contestId_problemId: { groupId, seasonId, contestId, problemId },
  //         },
  //       },
  //       problem: { connect: { id: problemId } },
  //       ...updateUserGroupSeasonContestProblemInput,
  //     },
  //     update: updateUserGroupSeasonContestProblemInput,
  //     include: {
  //       problem: { include: { tags: true } },
  //     },
  //   })
  // }

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
