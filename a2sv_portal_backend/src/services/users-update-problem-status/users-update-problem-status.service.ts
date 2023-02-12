import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import {
  UserGroupSeasonTopicProblemService,
} from '../../app/user-group-season-topic-problem/user-group-season-topic-problem.service'
import {
  UpdateUserGroupSeasonTopicProblemInput,
} from '../../app/user-group-season-topic-problem/dto/update-user-group-season-topic-problem.input'
import { UserGroupSeasonTopicService } from '../../app/user-group-season-topic/user-group-season-topic.service'
import { ComfortLevelEnum } from '@prisma/client'
import { UserGroupSeasonService } from '../../app/user-group-season/user-group-season.service'
import { StudentDataAnalyticsService } from '../../app/user-group-season-analytics/student-data-analytics.service'

@Injectable()
export class UsersUpdateProblemStatusService {
  constructor(
    private readonly userGroupSeasonTopicProblemService: UserGroupSeasonTopicProblemService,
    private readonly userGroupSeasonTopicService: UserGroupSeasonTopicService,
    private readonly userGroupSeasonService: UserGroupSeasonService,
    private readonly studentDataAnalyticsService: StudentDataAnalyticsService,
    private readonly prismaService: PrismaService,
  ) {
  }

  async updateSeasonTopicProblemStatus(
    updateUserGroupSeasonTopicProblemInput: UpdateUserGroupSeasonTopicProblemInput,
  ) {
    const {
      id: { userId, groupId, seasonId, topicId, problemId },
      ...updates
    } = updateUserGroupSeasonTopicProblemInput
    /*
    1. Find user with userId and throw NotFoundException if doesn't exist
    check if user is in the same group as groupId provided if not throw "user not in the group" Error
    2. Get group from user, and search for GroupSeasonTopic if it doesn't exist,
    throw NotFoundException "topic hasn't been added to your group"
    3. Check if the groupSeason the user in is active if not throw "season is not active error"
    4. Upsert UserGroupSeason search for group and throw notFoundException if not found,
    search for season and throw notFoundException if not found,
    5. search for problem and throw notFoundException if not found,
    6. search for GroupSeasonTopicProblem from the groupId if not found,
    7. throw NotFoundException "problem under this topic hasn't been added to your group yet!"
     */

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

    const season = await this.prismaService.season.findUnique({ where: { id: seasonId } })
    if (!season) {
      throw new NotFoundException(`Season with id: ${seasonId} not found!`)
    }

    const group = await this.prismaService.group.findUnique({ where: { id: groupId } })
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
      throw new Error('This group\'s season is not active!')

    const userGSTP = await this.prismaService.userGroupSeasonTopic.findUnique({
      where: {
        userId_groupId_seasonId_topicId: { userId, groupId, seasonId, topicId },
      },
    })
    await this.userGroupSeasonService.upsert({
      userId,
      groupId,
      seasonId,
    })
    await this.userGroupSeasonTopicService.updateUserTopicComfortability({
      id: { userId, groupId, seasonId, topicId },
      comfortLevel: userGSTP ? userGSTP.comfortLevel : ComfortLevelEnum.UNCOMFORTABLE,
    })

    // ======== Generating or creating daily stat info ======= //
    /* 1. fetch old problem status
       2. if it doesn't exist continue else
       3. check if the user is going to update the problem solved status
       4. if it is changed then update last status updated dated
       5. and then finally update the total problem solved count on usersDailyStat
    */
    const oldStatus =
      await this.userGroupSeasonTopicProblemService.userGroupSeasonTopicProblem({
        userId,
        groupId,
        seasonId,
        topicId,
        problemId,
      })
    if (!oldStatus || oldStatus.status !== updates.status) {
      updateUserGroupSeasonTopicProblemInput.statusUpdatedAt = new Date()
    }
    const updated = await this.userGroupSeasonTopicProblemService.updateUserProblemStatus(
      updateUserGroupSeasonTopicProblemInput,
    )

    // update usersDailyStat
    if (oldStatus) {
      // if the status was updated in previous times the update the stat on that date
      await this.studentDataAnalyticsService.upsert({
        userId,
        groupId,
        seasonId,
        createdAt: oldStatus.statusUpdatedAt,
      })
    }
    // update the stat on today's date
    await this.studentDataAnalyticsService.upsert({
      userId,
      groupId,
      seasonId,
      createdAt: updated.statusUpdatedAt,
    })

    return updated
  }
}
