import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { UpdateUserGroupSeasonTopicProblemInput } from './dto/update-user-season-topic-problem.input'
import { UserGroupSeasonTopicProblem } from './entities/user-season-topic-problem.entity'
import { FilterUserGroupSeasonTopicProblemInput } from './dto/filter-user-season-topic-problem.input'
import { PaginationInput } from '../../common/page/pagination.input'
import { PaginationUserGroupSeasonTopicProblem } from '../../common/page/pagination-info'
import { UserGroupSeasonTopicProblemRepository } from './user-season-topic-problem.repository'
import { GroupSeasonTopicProblem } from 'src/group-relations/group-season-topic-problem/entities/group-season-topic-problem.entity'
import { GroupSeasonTopicProblemRepository } from 'src/group-relations/group-season-topic-problem/group-season-topic-problem.repository'
import { UserGroupSeasonTopicProblemId } from './dto/create-user-season-topic-problem.input'

@Injectable()
export class UserGroupSeasonTopicProblemService {
  constructor(
    private readonly UserGroupSeasonTopicProblemRepository: UserGroupSeasonTopicProblemRepository,
    private readonly groupSeasonTopicProblemRepository: GroupSeasonTopicProblemRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async UserGroupSeasonTopicProblem({
    seasonId,
    topicId,
    problemId,
    userId,
  }: UserGroupSeasonTopicProblemId): Promise<UserGroupSeasonTopicProblem> {
    let UserGroupSeasonTopicProblem: UserGroupSeasonTopicProblem =
      await this.UserGroupSeasonTopicProblemRepository.findOne({
        userId_seasonId_topicId_problemId: {
          seasonId,
          topicId,
          problemId,
          userId,
        },
      })
    if (UserGroupSeasonTopicProblem === null || UserGroupSeasonTopicProblem === undefined) {
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
      UserGroupSeasonTopicProblem = {
        seasonId,
        topicId,
        problemId,
        userId,
        solved: false,
        attempts: 0,
        needHelp: false,
        solutionLink: '',
        timeDedicated: 0,
        problem: groupSeasonTopicProblem.problem,
      }
    }
    return UserGroupSeasonTopicProblem
  }

  async UserGroupSeasonTopicProblems(
    { groupId, ...filterSeasonTopicProblemUserInput }: FilterUserGroupSeasonTopicProblemInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationUserGroupSeasonTopicProblem> {
    // TODO: do mapping with groupSeasonTopicProblem
    const count = await this.UserGroupSeasonTopicProblemRepository.count(
      filterSeasonTopicProblemUserInput,
    )
    const UserGroupSeasonTopicProblems = await this.UserGroupSeasonTopicProblemRepository.findAll({
      skip,
      take,
      where: {
        ...filterSeasonTopicProblemUserInput,
        UserGroupSeasonTopic: { UserGroupSeason: { user: { groupId } } },
      },
    })
    return {
      items: UserGroupSeasonTopicProblems,
      pageInfo: { skip, take, count },
    }
  }

  async updateUserGroupSeasonTopicProblem({
    id,
    ...updates
  }: UpdateUserGroupSeasonTopicProblemInput): Promise<UserGroupSeasonTopicProblem> {
    // TODO: get group from the user,
    // TODO: search for GroupSeasonTopicProblem from the groupId if not found,
    // TODO: throw NotFoundException "problem under this topic hasn't been added to your group"
    // TODO: check if the groupSeason the user in is active if not throw "season is not active error"
    // TODO: upsert UserGroupSeason and then UserGroupSeasonTopic
    const { seasonId, problemId, userId, topicId } = id

    return this.prismaService.UserGroupSeasonTopicProblem.upsert({
      where: {
        userId_seasonId_topicId_problemId: {
          seasonId,
          topicId,
          problemId,
          userId,
        },
      },
      create: {
        UserGroupSeasonTopic: {
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

  async removeUserGroupSeasonTopicProblem({
    seasonId,
    topicId,
    problemId,
    userId,
  }: UserGroupSeasonTopicProblemId) {
    try {
      await this.UserGroupSeasonTopicProblemRepository.remove({
        userId_seasonId_topicId_problemId: {
          seasonId,
          topicId,
          problemId,
          userId,
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
