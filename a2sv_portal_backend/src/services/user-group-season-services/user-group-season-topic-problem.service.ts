import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { UpdateUserGroupSeasonTopicProblemInput } from '../../app/user-group-season-topic-problem/dto/update-user-group-season-topic-problem.input'
import { UserGroupSeasonTopicProblem } from '../../app/user-group-season-topic-problem/entities/user-group-season-topic-problem.entity'
import { FilterUserGroupSeasonTopicProblemInput } from '../../app/user-group-season-topic-problem/dto/filter-user-group-season-topic-problem.input'
import { PaginationInput } from '../../common/page/pagination.input'
import { PaginationUserGroupSeasonTopicProblem } from '../../common/page/pagination-info'
import { UserGroupSeasonTopicProblemRepository } from '../../app/user-group-season-topic-problem/user-group-season-topic-problem.repository'
import { GroupSeasonTopicProblem } from 'src/app/group-season-topic-problem/entities/group-season-topic-problem.entity'
import { GroupSeasonTopicProblemRepository } from 'src/app/group-season-topic-problem/group-season-topic-problem.repository'
import { UserGroupSeasonTopicProblemId } from '../../app/user-group-season-topic-problem/dto/create-user-group-season-topic-problem.input'

@Injectable()
export class UserGroupSeasonTopicProblemService {
  constructor(
    private readonly userGroupSeasonTopicProblemRepository: UserGroupSeasonTopicProblemRepository,
    private readonly groupSeasonTopicProblemRepository: GroupSeasonTopicProblemRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async userGroupSeasonTopicProblem({
    seasonId,
    groupId,
    topicId,
    problemId,
    userId,
  }: UserGroupSeasonTopicProblemId): Promise<UserGroupSeasonTopicProblem> {
    let userGroupSeasonTopicProblem: UserGroupSeasonTopicProblem =
      await this.userGroupSeasonTopicProblemRepository.findOne({
        userId_groupId_seasonId_topicId_problemId: {
          seasonId,
          groupId,
          topicId,
          problemId,
          userId,
        },
      })
    if (userGroupSeasonTopicProblem === null || userGroupSeasonTopicProblem === undefined) {
      const groupSeasonTopicProblem: GroupSeasonTopicProblem =
        await this.groupSeasonTopicProblemRepository.findOne({
          groupId_seasonId_topicId_problemId: {
            seasonId,
            topicId,
            problemId,
            groupId,
          },
        })
      userGroupSeasonTopicProblem = {
        seasonId,
        topicId,
        problemId,
        userId,
        groupId,
        solved: false,
        attempts: 0,
        needHelp: false,
        solutionLink: '',
        timeDedicated: 0,
        problem: groupSeasonTopicProblem.problem,
      }
    }
    return userGroupSeasonTopicProblem
  }

  async userGroupSeasonTopicProblems(
    filterSeasonTopicProblemUserInput: FilterUserGroupSeasonTopicProblemInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationUserGroupSeasonTopicProblem> {
    const { groupId, seasonId, topicId, userId } = filterSeasonTopicProblemUserInput
    // TODO: do mapping with groupSeasonTopicProblem
    const count = await this.userGroupSeasonTopicProblemRepository.count(
      filterSeasonTopicProblemUserInput,
    )
    const users = await this.prismaService.user.findMany({
      where: { groupId, id: userId },
    })
    const userGroupSeasonTopicProblems =
      await this.userGroupSeasonTopicProblemRepository.findAll({
        where: filterSeasonTopicProblemUserInput,
      })
    const groupSeasonTopicProblems: GroupSeasonTopicProblem[] =
      await this.groupSeasonTopicProblemRepository.findAll({
        skip,
        take,
        where: { groupId, seasonId, topicId },
      })
    const result: UserGroupSeasonTopicProblem[] = []
    const mappedUGSTPs: { ['key']?: UserGroupSeasonTopicProblem } = {}
    for (const userGroupSeasonTopicProblem1 of userGroupSeasonTopicProblems) {
      mappedUGSTPs[
        `${userGroupSeasonTopicProblem1.userId}${userGroupSeasonTopicProblem1.groupId}${userGroupSeasonTopicProblem1.seasonId}${userGroupSeasonTopicProblem1.topicId}${userGroupSeasonTopicProblem1.problemId}`
      ] = userGroupSeasonTopicProblem1
    }
    for (const groupSeasonTopicProblem of groupSeasonTopicProblems) {
      for (const user of users) {
        const check =
          mappedUGSTPs[
            `${user.id}${groupSeasonTopicProblem.groupId}${groupSeasonTopicProblem.seasonId}${groupSeasonTopicProblem.topicId}${groupSeasonTopicProblem.problemId}`
          ]
        if (check) {
          result.push(check)
        } else {
          result.push({
            seasonId: groupSeasonTopicProblem.seasonId,
            userId: user.id,
            groupId: user.groupId,
            topicId: groupSeasonTopicProblem.topicId,
            problemId: groupSeasonTopicProblem.problemId,
            solved: false,
            attempts: 0,
            needHelp: false,
            solutionLink: '',
            timeDedicated: 0,
            problem: groupSeasonTopicProblem.problem,
          })
        }
      }
    }
    return {
      items: result,
      pageInfo: { skip, take, count },
    }
  }

  // async removeUserGroupSeasonTopicProblem({
  //   seasonId,
  //   topicId,
  //   problemId,
  //   userId,
  //   groupId,
  // }: UserGroupSeasonTopicProblemId) {
  //   try {
  //     await this.userGroupSeasonTopicProblemRepository.remove({
  //       userId_groupId_seasonId_topicId_problemId: {
  //         seasonId,
  //         groupId,
  //         topicId,
  //         problemId,
  //         userId,
  //       },
  //     })
  //   } catch (e) {
  //     console.log(`Fail to delete season topic user problem with id ${seasonId}`, ' : ', e)
  //     throw new Error(`Fail to delete season topic user problem with id ${seasonId}`)
  //   }
  //   return 1
  // }
}

// TODO: Add user analytics here
// let number_wrong_sub: number
// if (updates.solved) {
//   await this.prismaService.userAnalytics.update({
//     where: {
//       userId_createdAt: {
//         userId,
//         createdAt: new Date(),
//       },
//     },
//     data: {
//       solvedCount: {
//         increment: 1,
//       },
//     },
//   })
// } else if (updates.solved == false) {
//   number_wrong_sub = updates.attempts > 0 ? updates.attempts : 1
//   await this.prismaService.userAnalytics.update({
//     where: {
//       userId_createdAt: {
//         userId,
//         createdAt: new Date(),
//       },
//     },
//     data: {
//       wrongCount: {
//         increment: number_wrong_sub,
//       },
//     },
//   })
// }
// console.log('===status ==updated')
