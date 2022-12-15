import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { UpdateUserGroupSeasonTopicProblemInput } from './dto/update-user-group-season-topic-problem.input'
import { UserGroupSeasonTopicProblem } from './entities/user-group-season-topic-problem.entity'
import { FilterUserGroupSeasonTopicProblemInput } from './dto/filter-user-group-season-topic-problem.input'
import { PaginationInput } from '../../common/page/pagination.input'
import { PaginationUserGroupSeasonTopicProblem } from '../../common/page/pagination-info'
import { UserGroupSeasonTopicProblemRepository } from './user-group-season-topic-problem.repository'
import {
  GroupSeasonTopicProblem,
} from 'src/group-relations/group-season-topic-problem/entities/group-season-topic-problem.entity'
import {
  GroupSeasonTopicProblemRepository,
} from 'src/group-relations/group-season-topic-problem/group-season-topic-problem.repository'
import { UserGroupSeasonTopicProblemId } from './dto/create-user-group-season-topic-problem.input'

@Injectable()
export class UserGroupSeasonTopicProblemService {
  constructor(
    private readonly userGroupSeasonTopicProblemRepository: UserGroupSeasonTopicProblemRepository,
    private readonly groupSeasonTopicProblemRepository: GroupSeasonTopicProblemRepository,
    private readonly prismaService: PrismaService,
  ) {
  }

  async userGroupSeasonTopicProblem(
    { seasonId, groupId, topicId, problemId, userId }: UserGroupSeasonTopicProblemId,
  ): Promise<UserGroupSeasonTopicProblem> {
    let userGroupSeasonTopicProblem: UserGroupSeasonTopicProblem =
      await this.userGroupSeasonTopicProblemRepository.findOne({
        userId_groupId_seasonId_topicId_problemId: {
          seasonId, groupId, topicId, problemId, userId,
        },
      })
    if (userGroupSeasonTopicProblem === null || userGroupSeasonTopicProblem === undefined) {
      const user = await this.prismaService.user.findUnique({ where: { id: userId } })
      const groupSeasonTopicProblem: GroupSeasonTopicProblem =
        await this.groupSeasonTopicProblemRepository.findOne({
          groupId_seasonId_topicId_problemId: {
            seasonId,
            topicId,
            problemId,
            groupId: user.groupId,
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
    { groupId, ...filterSeasonTopicProblemUserInput }: FilterUserGroupSeasonTopicProblemInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationUserGroupSeasonTopicProblem> {
    // TODO: do mapping with groupSeasonTopicProblem
    const count = await this.userGroupSeasonTopicProblemRepository.count(
      filterSeasonTopicProblemUserInput,
    )
    const userGroupSeasonTopicProblems = await this.userGroupSeasonTopicProblemRepository.findAll({
      skip, take,
      where: filterSeasonTopicProblemUserInput,
    })
    return {
      items: userGroupSeasonTopicProblems,
      pageInfo: { skip, take, count },
    }
  }

  async updateUserGroupSeasonTopicProblem(
    { id, ...updates }: UpdateUserGroupSeasonTopicProblemInput,
  ): Promise<UserGroupSeasonTopicProblem> {
    const { seasonId, problemId, userId, groupId, topicId } = id

    return this.prismaService.userGroupSeasonTopicProblem.upsert({
      where: {
        userId_groupId_seasonId_topicId_problemId: {
          seasonId, topicId, groupId, problemId, userId,
        },
      },
      create: {
        userGroupSeasonTopic: {
          connect: {
            userId_groupId_seasonId_topicId: { userId, groupId, seasonId, topicId },
          },
        },
        groupSeasonTopicProblem: {
          connect: {
            groupId_seasonId_topicId_problemId: { groupId, seasonId, topicId, problemId },
          },
        },
        problem: { connect: { id: problemId } },
        ...updates,
      },
      update: updates,
      include: {
        problem: { include: { tags: true } },
      },
    })
  }

  async removeUserGroupSeasonTopicProblem(
    { seasonId, topicId, problemId, userId, groupId }: UserGroupSeasonTopicProblemId,
  ) {
    try {
      await this.userGroupSeasonTopicProblemRepository.remove({
        userId_groupId_seasonId_topicId_problemId: {
          seasonId, groupId, topicId, problemId, userId,
        },
      })
    } catch (e) {
      console.log(`Fail to delete season topic user problem with id ${seasonId}`, ' : ', e)
      throw new Error(`Fail to delete season topic user problem with id ${seasonId}`)
    }
    return 1
  }
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
