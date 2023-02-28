import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import {
  UserGroupSeasonTopicProblem,
} from '../../app/user-group-season-topic-problem/entities/user-group-season-topic-problem.entity'
import {
  FilterUserGroupSeasonTopicProblemInput,
} from '../../app/user-group-season-topic-problem/dto/filter-user-group-season-topic-problem.input'
import { PaginationInput } from '../../common/page/pagination.input'
import { PaginationUserGroupSeasonTopicProblem } from '../../common/page/pagination-info'
import {
  UserGroupSeasonTopicProblemRepository,
} from '../../app/user-group-season-topic-problem/user-group-season-topic-problem.repository'
import { GroupSeasonTopicProblem } from 'src/app/group-season-topic-problem/entities/group-season-topic-problem.entity'
import {
  GroupSeasonTopicProblemRepository,
} from 'src/app/group-season-topic-problem/group-season-topic-problem.repository'
import {
  UserGroupSeasonTopicProblemId,
} from '../../app/user-group-season-topic-problem/dto/user-group-season-topic-problem-id.input'
import { UserTopicProblemStatusEnum } from '@prisma/client'

@Injectable()
export class UserGroupSeasonTopicProblemService {
  constructor(
    private readonly userGroupSeasonTopicProblemRepository: UserGroupSeasonTopicProblemRepository,
    private readonly groupSeasonTopicProblemRepository: GroupSeasonTopicProblemRepository,
    private readonly prismaService: PrismaService,
  ) {
  }

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
        status: UserTopicProblemStatusEnum.NOT_SOLVED,
        numberOfAttempts: 0,
        numberOfMinutes: 0.0,
        solutionLink: '',
        problem: groupSeasonTopicProblem.problem,
        createdAt: groupSeasonTopicProblem.createdAt,
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
        orderBy: { createdAt: 'asc' },
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
          if (user.groupId)
            result.push({
              seasonId: groupSeasonTopicProblem.seasonId,
              userId: user.id,
              groupId: user.groupId,
              topicId: groupSeasonTopicProblem.topicId,
              problemId: groupSeasonTopicProblem.problemId,
              status: UserTopicProblemStatusEnum.NOT_SOLVED,
              numberOfAttempts: 0,
              numberOfMinutes: 0.0,
              solutionLink: '',
              problem: groupSeasonTopicProblem.problem,
              createdAt: groupSeasonTopicProblem.createdAt,
            })
        }
      }
    }
    return {
      items: result,
      pageInfo: { skip, take, count },
    }
  }
}
