import { Injectable } from '@nestjs/common'
import { PaginationInput } from 'src/common/page/pagination.input'
import { UserGroupSeasonId } from '../../app/user-group-season/dto/create-group-user-season.input'
import { FilterUserGroupSeasonInput } from '../../app/user-group-season/dto/filter-user-group-season-input'
import { UserGroupSeasonRepository } from '../../app/user-group-season/user-group-season.repository'
import { UserGroupSeasonTopicService } from './user-group-season-topic.service'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class UserGroupSeasonService {
  constructor(
    private readonly userGroupSeasonRepository: UserGroupSeasonRepository,
    private readonly userGroupSeasonTopicService: UserGroupSeasonTopicService,
    private readonly prismaService: PrismaService,
  ) {
  }

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
      userId, groupId, seasonId,
    })
    if (userStat === undefined || userStat === null) {
      userStat = {
        groupId, seasonId, userId,
        user,
        rank: 0,
        totalSubmissions: 0,
        totalAcceptedSubmissions: 0,
        acceptanceRate: 0,
        averageContestRating: 0,
        totalContestsAttended: 0,
        userGroupSeasonTopics: [],
        userGroupSeasonContests: [],
      }
    } else {
      const totalSubmissions = userTopics.items.map(t => t.totalSubmissions)
        .reduce((a, b) => a + b, 0)
      const totalAcceptedSubmissions = userTopics.items.map(t => t.totalAcceptedSubmissions)
        .reduce((a, b) => a + b, 0)
      userStat = {
        groupId, seasonId, userId,
        user,
        rank: 0,
        totalSubmissions,
        totalAcceptedSubmissions,
        acceptanceRate: (totalAcceptedSubmissions / totalSubmissions) * 100,
        averageContestRating: 0,
        totalContestsAttended: 0,
        userGroupSeasonTopics: userTopics.items,
        userGroupSeasonContests: [],
      }
    }
    return userStat
  }

  async userGroupSeasons(
    { seasonId, userId }: FilterUserGroupSeasonInput,
    { take, skip }: PaginationInput = { take: 50, skip: 0 },
  ) {
    /// TODO generate multiple stat here
    return this.userGroupSeasonRepository.findAll({
      take,
      skip,
      where: { seasonId, userId },
    })
  }

  async removeUserGroupSeason({ seasonId, groupId, userId }: UserGroupSeasonId) {
    return this.userGroupSeasonRepository.remove({
      userId_groupId_seasonId: { seasonId, groupId, userId },
    })
  }
}
