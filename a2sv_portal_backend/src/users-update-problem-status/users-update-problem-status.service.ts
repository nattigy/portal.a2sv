import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import {
  UserGroupSeasonTopicProblemService,
} from '../app/user-group-season-topic-problem/user-group-season-topic-problem.service'
import {
  UpdateUserGroupSeasonTopicProblemInput,
} from '../app/user-group-season-topic-problem/dto/update-user-group-season-topic-problem.input'
import { UserGroupSeasonTopicService } from '../app/user-group-season-topic/user-group-season-topic.service'
import { ComfortLevelEnum } from '@prisma/client'
import { UserGroupSeasonService } from '../app/user-group-season/user-group-season.service'
import {
  UserGroupSeasonDailyAnalyticsService
} from '../app/user-group-season-daily-analytics/user-group-season-daily-analytics.service'

@Injectable()
export class UsersUpdateProblemStatusService {
  constructor(
    private readonly userGroupSeasonTopicProblemService: UserGroupSeasonTopicProblemService,
    private readonly userGroupSeasonTopicService: UserGroupSeasonTopicService,
    private readonly userGroupSeasonService: UserGroupSeasonService,
    private readonly userGroupSeasonDailyAnalyticsService: UserGroupSeasonDailyAnalyticsService,
    private readonly prismaService: PrismaService,
  ) {
  }

  async updateProblemStatus(updateUserGroupSeasonTopicProblemInput: UpdateUserGroupSeasonTopicProblemInput) {
    const {
      id: {
        userId, groupId, seasonId, topicId, problemId,
      }, ...updates
    } = updateUserGroupSeasonTopicProblemInput
    const problem = await this.prismaService.problem.findUnique({
      where: { id: problemId },
    })
    if (!problem) throw new NotFoundException(`problem with id ${problemId} does not exist!`)
    const groupSeasonTopicProblem =
      await this.prismaService.groupSeasonTopicProblem.findUnique({
        where: {
          groupId_seasonId_topicId_problemId: {
            seasonId,
            topicId,
            groupId,
            problemId,
          },
        },
      })
    if (!groupSeasonTopicProblem)
      throw new NotFoundException(
        `problem under this topic hasn't been added to your group yet!`,
      )
    const group = await this.prismaService.group.findUnique({ where: { id: groupId } })
    const season = await this.prismaService.season.findUnique({ where: { id: seasonId } })
    if (!season) {
      throw new NotFoundException(`Season with id: ${seasonId} not found!`)
    }
    if (!group) {
      throw new NotFoundException(`Group with id: ${groupId} not found!`)
    }
    const foundUser = await this.prismaService.user.findUnique({ where: { id: userId } })
    if (!foundUser) throw new NotFoundException(`User with id ${userId} does not exist!`)

    if (foundUser.groupId !== groupId) throw new Error('User is not in this group!')

    const foundGroupSeasonTopic = await this.prismaService.groupSeasonTopic.findUnique({
      where: {
        groupId_seasonId_topicId: { groupId, seasonId, topicId },
      },
      include: { groupSeason: true },
    })
    if (!foundGroupSeasonTopic) throw new Error('Topic is not added to your group yet!')
    if (!foundGroupSeasonTopic.groupSeason.isActive)
      throw new Error("This group's season is not active!")

    const userGSTP = await this.prismaService.userGroupSeasonTopic.findUnique({
      where:{
        userId_groupId_seasonId_topicId: { userId, groupId, seasonId, topicId },
      }
    })
    await this.userGroupSeasonService.upsert({
      userId, groupId, seasonId,
    })
    await this.userGroupSeasonTopicService.updateUserTopicComfortability({
      id: { userId, groupId, seasonId, topicId },
      comfortLevel: userGSTP
        ? userGSTP.comfortLevel
        : ComfortLevelEnum.UNCOMFORTABLE
    })
    // TODO: fetch old problem status
    /// if it doesn't exist continue else
    return this.userGroupSeasonTopicProblemService.updateUserProblemStatus(updateUserGroupSeasonTopicProblemInput)
  }
}
