import { Injectable } from '@nestjs/common'
import { PaginationUserGroupSeasonContestProblem } from 'src/common/page/pagination-info'
import { PaginationInput } from 'src/common/page/pagination.input'
import { PrismaService } from '../../prisma/prisma.service'
import { UserGroupSeasonContestService } from '../user-group-season-contest/user-group-season-contest.service'
import { UserGroupSeasonContestProblemId } from './dto/create-user-group-contest-problem.input'
import { FilterUserContestProblemInput } from './dto/filter-user-group-contest-problem'
import { UpdateUserGroupContestProblemInput } from './dto/update-user-group-contest-problem.input'
import { UserGroupSeasonContestProblem } from './entities/user-season-contest-problem.entity'
import { UserGroupSeasonContestProblemRepository } from './user-group-season-contest-problem.repository'

@Injectable()
export class UserGroupSeasonContestProblemService {
  constructor(
    private readonly prismaService: PrismaService,
    // private readonly groupSeasonContestProblemRepository: GroupSeasonContestProblemRepository,
    private readonly userGroupSeasonContestProblemRepository: UserGroupSeasonContestProblemRepository,
  ) {}


  async userGroupSeasonContestProblems(
    {groupId, ...filterUserGroupSeasonContestProblemInput}: FilterUserContestProblemInput,

    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationUserGroupSeasonContestProblem> {
    const count = (
      await this.userGroupSeasonContestProblemRepository.count(
       filterUserGroupSeasonContestProblemInput
      )
    )
    const UserGroupSeasonContestProblems = await this.userGroupSeasonContestProblemRepository.findAll({
      skip, take,
      where: filterUserGroupSeasonContestProblemInput,
    
    })
    return {
      items:  UserGroupSeasonContestProblems ,
      pageInfo: {
        skip,
        take,
        count,
      },
    }
  }
  
  async userGroupSeasonContestProblem({
    userId,
    contestId,
    seasonId,
    groupId,
    problemId,
  }: UserGroupSeasonContestProblemId): Promise<UserGroupSeasonContestProblem> {
    let userGroupSeasonContestProblem: UserGroupSeasonContestProblem = 
    await this.userGroupSeasonContestProblemRepository.findOne({
        userId_groupId_seasonId_contestId_problemId: {
          userId,
          contestId,
          groupId,
          problemId,
          seasonId,
        },  
    })
  if (userGroupSeasonContestProblem == null || userGroupSeasonContestProblem == undefined){
    const user = await this.prismaService.user.findUnique({ where: { id: userId } })
    const contest = this.prismaService.contest.findUnique({
          where:{id:contestId}
        })
    
  }
  return userGroupSeasonContestProblem
}
  
  // async updateUserGroupSeasonContestProblem(
  //   updateUserGroupSeasonContestProblem: UpdateUserGroupContestProblemInput): Promise<UserGroupSeasonContestProblem> {
  //   // const { seasonId, problemId, userId, groupId, contestId } = id
  //   return this.prismaService.userGroupSeasonContestProblem.upsert({
  //     where: {
  //       userId_groupId_seasonId_contestId_problemId: {
  //         seasonId, contestId, groupId, problemId, userId,
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
  //       updateUserGroupSeasonContestProblem,
  //     },
  //     update: updateUserGroupSeasonContestProblem,
  //     include: {
  //       problem: { include: { tags: true } },
  //     },
  //   })
  // }
  
  async removeUserGroupSeasonContestProblem(
    { userId, contestId, problemId, groupId, seasonId }: UserGroupSeasonContestProblemId) {
    try {
      await this.userGroupSeasonContestProblemRepository.remove({
        userId_groupId_seasonId_contestId_problemId: {
          seasonId, groupId, contestId, problemId, userId,
        },
        },
      )
    } catch (e) {
      console.log(`Fail to delete user contest problem with id ${userId}`, ' : ', e)
      throw new Error(`Fail to delete user contest problem with id ${userId}`)
    }
    return 1
  }
}
