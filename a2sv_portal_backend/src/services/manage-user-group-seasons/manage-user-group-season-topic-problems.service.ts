import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { UserGroupSeasonTopicProblem } from '../../app/user-group-season-topic-problem/entities/user-group-season-topic-problem.entity'
import { FilterUserGroupSeasonTopicProblemInput } from '../../app/user-group-season-topic-problem/dto/filter-user-group-season-topic-problem.input'
import { PaginationInput } from '../../common/page/pagination.input'
import { PaginationUserGroupSeasonTopicProblem } from '../../common/page/pagination-info'
import { GroupSeasonTopicProblem } from 'src/app/group-season-topic-problem/entities/group-season-topic-problem.entity'
import { GroupSeasonTopicProblemRepository } from 'src/app/group-season-topic-problem/group-season-topic-problem.repository'
import { UserGroupSeasonTopicProblemId } from '../../app/user-group-season-topic-problem/dto/user-group-season-topic-problem-id.input'
import { UserTopicProblemStatusEnum } from '@prisma/client'
import { UserGroupSeasonTopicProblemService } from '../../app/user-group-season-topic-problem/user-group-season-topic-problem.service'

@Injectable()
export class ManageUserGroupSeasonTopicProblemsService {
  constructor(
    private readonly userGroupSeasonTopicProblemService: UserGroupSeasonTopicProblemService,
    private readonly groupSeasonTopicProblemRepository: GroupSeasonTopicProblemRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async userGroupSeasonTopicProblem(
    userGroupSeasonTopicProblemId: UserGroupSeasonTopicProblemId,
  ): Promise<UserGroupSeasonTopicProblem> {
    const { groupId, seasonId, topicId, problemId, userId } = userGroupSeasonTopicProblemId
    let userGroupSeasonTopicProblem: UserGroupSeasonTopicProblem =
      await this.userGroupSeasonTopicProblemService.userGroupSeasonTopicProblem(
        userGroupSeasonTopicProblemId,
      )
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
      if (!groupSeasonTopicProblem) {
        throw new NotFoundException(
          "This problem hasn't been added to your group on this season and under this topic!",
        )
      }
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
    const { groupId, seasonId, topicId, userId, problemId, createdAt } =
      filterSeasonTopicProblemUserInput
    /** mapping with groupSeasonTopicProblem **/
    const users = await this.prismaService.user.findMany({
      where: { groupId, id: userId },
    })
    const userGroupSeasonTopicProblems =
      await this.userGroupSeasonTopicProblemService.userGroupSeasonTopicProblems(
        filterSeasonTopicProblemUserInput,
      )
    const groupSeasonTopicProblems: GroupSeasonTopicProblem[] =
      await this.groupSeasonTopicProblemRepository.findAll({
        skip,
        take,
        where: { groupId, seasonId, topicId, createdAt },
        orderBy: { createdAt: 'asc' },
      })
    const count = await this.groupSeasonTopicProblemRepository.count({
      groupId,
      seasonId,
      topicId,
      problemId,
    })
    const result: UserGroupSeasonTopicProblem[] = []
    const mappedUGSTPs: { ['key']?: UserGroupSeasonTopicProblem } = {}
    for (const userProblem of userGroupSeasonTopicProblems) {
      mappedUGSTPs[
        `${userProblem.userId}${userProblem.groupId}${userProblem.seasonId}${userProblem.topicId}${userProblem.problemId}`
      ] = userProblem
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
