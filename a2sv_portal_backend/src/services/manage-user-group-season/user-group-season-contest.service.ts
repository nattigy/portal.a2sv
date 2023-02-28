import { Injectable } from '@nestjs/common'
import { PaginationInput } from '../../common/page/pagination.input'
import { PrismaService } from '../../prisma/prisma.service'
import { PaginationUserGroupSeasonContest } from '../../common/page/pagination-info'
import { UserGroupSeasonContestId } from '../../app/user-group-season-contest/dto/create-user-group-season-contest.input'
import { UserGroupSeasonContestRepository } from '../../app/user-group-season-contest/user-group-season-contest.repository'
import { FilterUserGroupSeasonContestInput } from '../../app/user-group-season-contest/dto/filter-user-group-season-contest.input'
import { UserGroupSeasonContest } from '../../app/user-group-season-contest/entities/user-group-season-contest.entity'
import { UpdateUserGroupSeasonContestInput } from '../../app/user-group-season-contest/dto/update-user-group-season-contest.input'
import { UserGroupSeasonContestProblemService } from './user-group-season-contest-problem.service'

@Injectable()
export class UserGroupSeasonContestService {
  constructor(
    private readonly userGroupSeasonContestRepository: UserGroupSeasonContestRepository,
    private readonly userGroupSeasonContestProblemService: UserGroupSeasonContestProblemService,
    private readonly prismaService: PrismaService,
  ) {}

  async userGroupSeasonContest({
    userId,
    seasonId,
    contestId,
    groupId,
  }: UserGroupSeasonContestId): Promise<UserGroupSeasonContest> {
    const userGroupSeasonContest = await this.userGroupSeasonContestRepository.findOne({
      userId_groupId_seasonId_contestId: { userId, groupId, seasonId, contestId },
    })
    if (userGroupSeasonContest === null || userGroupSeasonContest === undefined) {
      // userGroupSeasonContest = {}
    }
    return userGroupSeasonContest
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

  async upsert(updateUserGroupSeasonContestInput: UpdateUserGroupSeasonContestInput) {
    const { userId, groupId, seasonId, contestId } = updateUserGroupSeasonContestInput
    return this.userGroupSeasonContestRepository.upsert({
      where: { userId_groupId_seasonId_contestId: { userId, groupId, seasonId, contestId } },
      data: updateUserGroupSeasonContestInput,
    })
  }

  // async updateUserGroupSeasonContest({
  //   id,
  //   ...updates
  // }: UpdateUserGroupSeasonContestInput): Promise<UserGroupSeasonContest> {
  //   const { userId, seasonId, contestId, groupId } = id
  //   return this.prismaService.userGroupSeasonContest.upsert({
  //     where: {
  //       userId_groupId_seasonId_contestId: { userId, groupId, seasonId, contestId },
  //     },
  //     create: {
  //       userGroupSeason: {
  //         connect: {
  //           userId_groupId_seasonId: { userId, groupId, seasonId },
  //         },
  //       },
  //       groupSeasonContest: {
  //         connect: { groupId_seasonId_contestId: { groupId, seasonId, contestId } },
  //       },
  //       contest: {
  //         connect: { id: contestId },
  //       },
  //     },
  //     update: updates,
  //     include: {
  //       contest: {
  //         include: { problems: { include: { tags: true } } },
  //       },
  //       userGroupSeasonContestProblems: {
  //         include: {
  //           problem: { include: { tags: true } },
  //         },
  //       },
  //     },
  //   })
  // }

  // async updateUserContestProblem(
  //   updateUserContestProblemInput: UpdateUserGroupSeasonContestProblemInput,
  // ) {
  //   return this.userGroupSeasonContestProblemService.updateUserGroupSeasonContestProblem(
  //     updateUserContestProblemInput,
  //   )
  // }

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
