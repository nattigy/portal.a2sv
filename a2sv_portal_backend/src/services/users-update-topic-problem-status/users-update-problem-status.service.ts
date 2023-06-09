import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { UserGroupSeasonTopicProblemService } from '../../app/user-group-season-topic-problem/user-group-season-topic-problem.service'
import { UpdateUserGroupSeasonTopicProblemInput } from '../../app/user-group-season-topic-problem/dto/update-user-group-season-topic-problem.input'
import { UserGroupSeasonService } from '../../app/user-group-season/user-group-season.service'
import { UserGroupSeasonDataAnalyticsService } from '../../app/user-group-season-data-analytics/user-group-season-data-analytics.service'
import { UserTopicProblemStatusEnum } from '@prisma/client'

@Injectable()
export class UsersUpdateProblemStatusService {
  constructor(
    private readonly userGroupSeasonTopicProblemService: UserGroupSeasonTopicProblemService,
    private readonly userGroupSeasonService: UserGroupSeasonService,
    private readonly studentDataAnalyticsService: UserGroupSeasonDataAnalyticsService,
    private readonly prismaService: PrismaService,
  ) {}

  async updateSeasonTopicProblemStatus(
    updateUserGroupSeasonTopicProblemInput: UpdateUserGroupSeasonTopicProblemInput,
  ) {
    const {
      id: { userId, groupId, seasonId, topicId, problemId },
      ...updates
    } = updateUserGroupSeasonTopicProblemInput
    /**
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
     **/

    const problem = await this.prismaService.problem.findUnique({
      where: { id: problemId },
    })
    if (!problem) throw new NotFoundException(`Problem with id ${problemId} does not exist!`)

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
        `Problem under this topic hasn't been added to your group yet!`,
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
      where: { groupId_seasonId_topicId: { groupId, seasonId, topicId } },
      include: { groupSeason: true },
    })
    if (!foundGroupSeasonTopic) throw new Error('Topic is not added to your group yet!')
    if (!foundGroupSeasonTopic.groupSeason.isActive)
      throw new Error("This group's season is not active!")

    /** ======== Generating or creating daily stat info ======= //
     1. fetch old problem status
     2. if it doesn't exist continue else
     3. check if the user is going to update the problem solved status
     4. if it is changed then update last status updated dated
     5. and then finally update the total problem solved count on usersDailyStat
     **/
    const oldStatus =
      await this.userGroupSeasonTopicProblemService.userGroupSeasonTopicProblem({
        userId,
        groupId,
        seasonId,
        topicId,
        problemId,
      })
    if (
      oldStatus &&
      oldStatus.status === UserTopicProblemStatusEnum.SOLVED &&
      new Date(oldStatus.statusUpdatedAt).getDate() < new Date().getDate()
    ) {
      throw new NotAcceptableException('Problem already solved!')
    }
    if (!oldStatus || oldStatus.status !== updates.status) {
      updateUserGroupSeasonTopicProblemInput.statusUpdatedAt = new Date()
    }
    await this.userGroupSeasonService.upsert({
      userId,
      groupId,
      seasonId,
    })
    const updated = await this.userGroupSeasonTopicProblemService.updateUserProblemStatus(
      updateUserGroupSeasonTopicProblemInput,
    )

    /** update usersDailyStat **/
    /** update the stat on today's date if the new status is solved **/
    if (updates.status === UserTopicProblemStatusEnum.SOLVED) {
      await this.studentDataAnalyticsService.upsert({
        userId,
        groupId,
        seasonId,
        createdAt: updated.statusUpdatedAt,
      })
    }

    return updated
  }
}
