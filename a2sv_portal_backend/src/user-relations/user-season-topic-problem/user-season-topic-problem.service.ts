import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { UpdateUserSeasonTopicProblemInput } from './dto/update-user-season-topic-problem.input'
import { UserSeasonTopicProblem } from './entities/user-season-topic-problem.entity'
import { FilterUserSeasonTopicProblemInput } from './dto/filter-user-season-topic-problem.input'
import { PaginationInput } from '../../common/page/pagination.input'
import { PaginationUserSeasonTopicProblem } from '../../common/page/pagination-info'
import { UserSeasonTopicProblemRepository } from './user-season-topic-problem.repository'
import {
  GroupSeasonTopicProblem,
} from 'src/group-relations/group-season-topic-problem/entities/group-season-topic-problem.entity'
import {
  GroupSeasonTopicProblemRepository,
} from 'src/group-relations/group-season-topic-problem/group-season-topic-problem.repository'
import { UserSeasonTopicProblemId } from './dto/create-user-season-topic-problem.input'

@Injectable()
export class UserSeasonTopicProblemService {
  constructor(
    private readonly userSeasonTopicProblemRepository: UserSeasonTopicProblemRepository,
    private readonly groupSeasonTopicProblemRepository: GroupSeasonTopicProblemRepository,
    private readonly prismaService: PrismaService,
  ) {
  }

  async userSeasonTopicProblem(
    { seasonId, topicId, problemId, userId }: UserSeasonTopicProblemId,
  ): Promise<UserSeasonTopicProblem> {
    let userSeasonTopicProblem: UserSeasonTopicProblem =
      await this.userSeasonTopicProblemRepository.findOne({
        userId_seasonId_topicId_problemId: {
          seasonId, topicId, problemId, userId,
        },
      })
    if (userSeasonTopicProblem === null || userSeasonTopicProblem === undefined) {
      const user = await this.prismaService.user.findUnique({ where: { id: userId } })
      const groupSeasonTopicProblem: GroupSeasonTopicProblem = await this.groupSeasonTopicProblemRepository.findOne({
        groupId_seasonId_topicId_problemId: {
          seasonId, topicId, problemId, groupId: user.groupId,
        },
      })
      userSeasonTopicProblem = {
        seasonId, topicId, problemId, userId,
        solved: false, attempts: 0, needHelp: false, solutionLink: '', timeDedicated: 0,
        problem: groupSeasonTopicProblem.problem,
      }
    }
    return userSeasonTopicProblem
  }

  async userSeasonTopicProblems(
    filterSeasonTopicProblemUserInput: FilterUserSeasonTopicProblemInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationUserSeasonTopicProblem> {
    const count = await this.userSeasonTopicProblemRepository.count(filterSeasonTopicProblemUserInput)
    const userSeasonTopicProblems = await this.userSeasonTopicProblemRepository.findAll({
      skip, take,
      where: filterSeasonTopicProblemUserInput,
    })
    return {
      items: userSeasonTopicProblems,
      pageInfo: {
        skip,
        take,
        count,
      },
    }
  }

  async updateUserSeasonTopicProblem(
    { id, ...updates }: UpdateUserSeasonTopicProblemInput,
  ): Promise<UserSeasonTopicProblem> {
    const { seasonId, problemId, userId, topicId } = id
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

    return this.prismaService.userSeasonTopicProblem.upsert({
      where: {
        userId_seasonId_topicId_problemId: {
          seasonId, topicId, problemId, userId,
        },
      },
      create: {
        userSeasonTopic: {
          connect: { userId_seasonId_topicId: { userId, seasonId, topicId } },
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

  async removeSeasonTopicProblemUser({ seasonId, topicId, problemId, userId }: UserSeasonTopicProblemId) {
    try {
      await this.userSeasonTopicProblemRepository.remove({
        userId_seasonId_topicId_problemId: {
          seasonId, topicId, problemId, userId,
        },
      })
    } catch (e) {
      console.log(`Fail to delete season topic user problem with id ${seasonId}`, ' : ', e)
      throw new Error(`Fail to delete season topic user problem with id ${seasonId}`)
    }
    return 1
  }
}
