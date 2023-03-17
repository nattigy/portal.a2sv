import { Injectable } from '@nestjs/common'
import { UserGroupSeasonId } from '../../app/user-group-season/dto/create-group-user-season.input'
import { FilterUserGroupSeasonInput } from '../../app/user-group-season/dto/filter-user-group-season-input'
import { UserGroupSeasonRepository } from '../../app/user-group-season/user-group-season.repository'
import { ManageUserGroupSeasonTopicsService } from './manage-user-group-season-topics.service'
import { PrismaService } from '../../prisma/prisma.service'
import { ProblemDifficultyTypeEnum, UserTopicProblemStatusEnum } from '@prisma/client'
import { PaginationInput } from '../../common/page/pagination.input'
import { UserGroupSeason } from '../../app/user-group-season/entities/user-group-season.entity'
import { GroupSeasonRepository } from '../../app/group-season/group-season.repository'

@Injectable()
export class ManageUserGroupSeasonsService {
  constructor(
    private readonly userGroupSeasonRepository: UserGroupSeasonRepository,
    private readonly groupSeasonRepository: GroupSeasonRepository,
    private readonly userGroupSeasonTopicService: ManageUserGroupSeasonTopicsService,
    private readonly prismaService: PrismaService,
  ) {}

  async userGroupSeason({ seasonId, groupId, userId }: UserGroupSeasonId) {
    /** generate user stat on a specific season **/
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    })
    const userTopics = await this.userGroupSeasonTopicService.userGroupSeasonTopics({
      userId,
      groupId,
      seasonId,
    })
    const totalSubmissions = userTopics.items
      .map(t => t.totalSubmissions)
      .reduce((a, b) => a + b, 0)
    const totalAcceptedSubmissions = userTopics.items
      .map(t => t.totalAcceptedSubmissions)
      .reduce((a, b) => a + b, 0)
    const easyCount = userTopics.items.flatMap(
      t =>
        t.userGroupSeasonTopicProblems
          .filter(p => p.status === UserTopicProblemStatusEnum.SOLVED)
          .filter(p => p.problem.difficulty === ProblemDifficultyTypeEnum.EASY),
      1,
    ).length
    const mediumCount = userTopics.items.flatMap(
      t =>
        t.userGroupSeasonTopicProblems
          .filter(p => p.status === UserTopicProblemStatusEnum.SOLVED)
          .filter(p => p.problem.difficulty === ProblemDifficultyTypeEnum.MEDIUM),
      1,
    ).length
    const hardCount = userTopics.items.flatMap(
      t =>
        t.userGroupSeasonTopicProblems
          .filter(p => p.status === UserTopicProblemStatusEnum.SOLVED)
          .filter(p => p.problem.difficulty === ProblemDifficultyTypeEnum.HARD),
      1,
    ).length
    return {
      groupId,
      seasonId,
      userId,
      user,
      totalSubmissions,
      totalAcceptedSubmissions,
      acceptanceRate: totalSubmissions
        ? (totalAcceptedSubmissions / totalSubmissions) * 100
        : 0,
      averageContestRating: 0,
      totalContestsAttended: 0,
      easyCount,
      mediumCount,
      hardCount,
      userGroupSeasonTopics: userTopics.items,
      userGroupSeasonContests: [],
    }
  }

  async userGroupSeasons(
    { seasonId, userId, groupId }: FilterUserGroupSeasonInput,
    { take, skip }: PaginationInput = { take: 50, skip: 0 },
  ) {
    const users = await this.prismaService.user.findMany({
      where: { id: userId, groupId },
    })
    const userGroupSeasons = await this.userGroupSeasonRepository.findAll({
      where: { userId, groupId, seasonId },
    })
    const userGroupSeasonTopics = await this.userGroupSeasonTopicService.userGroupSeasonTopics({
        userId,
        groupId,
        seasonId,
      })
    const result: UserGroupSeason[] = []
    /** here we make sure that the data we are returning is unique, per user, group, season, and topic **/
    const mappedUGSs: { ['key']?: UserGroupSeason } = {}
    for (const userGroupSeason of userGroupSeasons) {
      /** add the list of problems for each unique UserGroupSeasonTopic
       * on this step we only add data that already exists on the database
       * Data only exists on the database if a student fills their status whether it,
       * topic comfortability, or problem solved status.
       **/
      mappedUGSs[
        `${userGroupSeason.userId}${userGroupSeason.groupId}${userGroupSeason.seasonId}`
      ] = {
        ...userGroupSeason,
        userGroupSeasonTopics: userGroupSeasonTopics.items.filter(
          u =>
            u.userId === userGroupSeason.userId &&
            u.groupId === userGroupSeason.groupId &&
            u.seasonId === userGroupSeason.seasonId,
        ),
      }
    }
    /** groupSeasons is needed to do the mapping **/
    const groupSeasons = await this.groupSeasonRepository.findAll({
      skip,
      take,
      where: { groupId, seasonId },
    })
    for (const groupSeason of groupSeasons) {
      for (const user of users) {
        const uTopics = userGroupSeasonTopics.items.filter(
          t =>
            t.userId === user.id &&
            t.groupId === groupSeason.groupId &&
            t.seasonId === groupSeason.seasonId,
        )
        const totalSubmissions = uTopics
          .map(t => t.totalSubmissions)
          .reduce((a, b) => a + b, 0)
        const totalAcceptedSubmissions = uTopics
          .map(t => t.totalAcceptedSubmissions)
          .reduce((a, b) => a + b, 0)
        const easyCount = uTopics.flatMap(
          t =>
            t.userGroupSeasonTopicProblems
              .filter(p => p.status === UserTopicProblemStatusEnum.SOLVED)
              .filter(p => p.problem.difficulty === ProblemDifficultyTypeEnum.EASY),
          1,
        ).length
        const mediumCount = uTopics.flatMap(
          t =>
            t.userGroupSeasonTopicProblems
              .filter(p => p.status === UserTopicProblemStatusEnum.SOLVED)
              .filter(p => p.problem.difficulty === ProblemDifficultyTypeEnum.MEDIUM),
          1,
        ).length
        const hardCount = uTopics.flatMap(
          t =>
            t.userGroupSeasonTopicProblems
              .filter(p => p.status === UserTopicProblemStatusEnum.SOLVED)
              .filter(p => p.problem.difficulty === ProblemDifficultyTypeEnum.HARD),
          1,
        ).length
        const acceptanceRate =
          totalSubmissions > 0 ? (totalAcceptedSubmissions / totalSubmissions) * 100 : 0
        result.push({
          userId: user.id,
          groupId: groupSeason.groupId,
          seasonId: groupSeason.seasonId,
          totalSubmissions,
          totalAcceptedSubmissions,
          acceptanceRate,
          easyCount,
          mediumCount,
          hardCount,
          userGroupSeasonTopics: uTopics,
          user,
          userGroupSeasonContests: [],
          totalContestsAttended: 0,
          averageContestRating: 0,
        })
      }
    }
    return result
  }

  async removeUserGroupSeason({ seasonId, groupId, userId }: UserGroupSeasonId) {
    return this.userGroupSeasonRepository.remove({
      userId_groupId_seasonId: { seasonId, groupId, userId },
    })
  }
}
