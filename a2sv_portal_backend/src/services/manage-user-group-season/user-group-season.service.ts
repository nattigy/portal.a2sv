import { Injectable } from '@nestjs/common'
import { UserGroupSeasonId } from '../../app/user-group-season/dto/create-group-user-season.input'
import { FilterUserGroupSeasonInput } from '../../app/user-group-season/dto/filter-user-group-season-input'
import { UserGroupSeasonRepository } from '../../app/user-group-season/user-group-season.repository'
import { UserGroupSeasonTopicService } from './user-group-season-topic.service'
import { PrismaService } from '../../prisma/prisma.service'
import { ProblemDifficultyTypeEnum, UserTopicProblemStatusEnum } from '@prisma/client'
import { PaginationInput } from '../../common/page/pagination.input'
import { UserGroupSeason } from '../../app/user-group-season/entities/user-group-season.entity'

@Injectable()
export class ManageUserGroupSeasonService {
  constructor(
    private readonly userGroupSeasonRepository: UserGroupSeasonRepository,
    private readonly userGroupSeasonTopicService: UserGroupSeasonTopicService,
    private readonly prismaService: PrismaService,
  ) {}

  async userGroupSeason({ seasonId, groupId, userId }: UserGroupSeasonId) {
    /// generating user stat on a specific season
    // TODO: find user and if not found return not found exception
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    })
    let userStat = await this.userGroupSeasonRepository.findOne({
      userId_groupId_seasonId: { seasonId, groupId, userId },
    })
    const userTopics = await this.userGroupSeasonTopicService.userGroupSeasonTopics({
      userId,
      groupId,
      seasonId,
    })
    if (userStat === undefined || userStat === null) {
      userStat = {
        groupId,
        seasonId,
        userId,
        user,
        // rank: 0,
        totalSubmissions: 0,
        totalAcceptedSubmissions: 0,
        acceptanceRate: 0,
        easyCount: 0,
        mediumCount: 0,
        hardCount: 0,
        averageContestRating: 0,
        totalContestsAttended: 0,
        userGroupSeasonTopics: [],
        userGroupSeasonContests: [],
      }
    } else {
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
      userStat = {
        groupId,
        seasonId,
        userId,
        user,
        // rank: 0,
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
    return userStat
  }

  async userGroupSeasons(
    { seasonId, userId, groupId }: FilterUserGroupSeasonInput,
    { take, skip }: PaginationInput = { take: 50, skip: 0 },
  ) {
    /// TODO generate multiple stat here
    const users = await this.prismaService.user.findMany({
      where: { id: userId, groupId },
    })
    const userSeasons = await this.userGroupSeasonRepository.findAll({
      where: { userId, groupId, seasonId },
    })
    const statMap: { '[key]'?: UserGroupSeason } = {}
    for (const userSeason of userSeasons) {
      statMap[`${userSeason.userId}${userSeason.groupId}${userSeason.seasonId}`] = userSeason
    }
    for (const user of users) {
      for (const userSeason of userSeasons) {
        const check = statMap[`${user.id}${user.groupId}${userSeason.seasonId}`]
        if (!check) {
          statMap[`${user.id}${user.groupId}${userSeason.seasonId}`] = {
            userId: user.id,
            groupId: user.groupId,
            seasonId: userSeason.seasonId,
            // rank: 0,
            totalSubmissions: 0,
            totalAcceptedSubmissions: 0,
            acceptanceRate: 0,
            averageContestRating: 0,
            totalContestsAttended: 0,
            easyCount: 0,
            mediumCount: 0,
            hardCount: 0,
            userGroupSeasonTopics: [],
            userGroupSeasonContests: [],
            user,
          }
        }
      }
    }
    const usersTopics = (
      await this.userGroupSeasonTopicService.userGroupSeasonTopics({
        userId,
        groupId,
        seasonId,
      })
    ).items
    const userStats = []
    for (const statMapKey in statMap) {
      const stat = statMap[statMapKey]
      const uTopics = usersTopics.filter(
        t =>
          t.userId === stat.userId &&
          t.groupId === stat.groupId &&
          t.seasonId === stat.seasonId &&
          t.topicId === stat.topicId,
      )
      const totalSubmissions = uTopics.map(t => t.totalSubmissions).reduce((a, b) => a + b, 0)
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
      const acceptanceRate = uTopics.length
        ? (uTopics.map(t => t.comfortabilityPercentage).reduce((a, b) => a + b, 0) /
            uTopics.length) *
          100
        : 0
      statMap[statMapKey] = {
        ...statMap[statMapKey],
        totalSubmissions,
        totalAcceptedSubmissions,
        acceptanceRate,
        easyCount,
        mediumCount,
        hardCount,
      }
    }
    return userStats
  }

  async removeUserGroupSeason({ seasonId, groupId, userId }: UserGroupSeasonId) {
    return this.userGroupSeasonRepository.remove({
      userId_groupId_seasonId: { seasonId, groupId, userId },
    })
  }
}
