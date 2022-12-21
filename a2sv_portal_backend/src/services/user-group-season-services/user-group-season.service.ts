import { Injectable } from '@nestjs/common'
import { PaginationInput } from 'src/common/page/pagination.input'
import { UserGroupSeasonId } from '../../app/user-group-season/dto/create-group-user-season.input'
import { FilterUserGroupSeasonInput } from '../../app/user-group-season/dto/filter-user-group-season-input'
import { UserGroupSeasonRepository } from '../../app/user-group-season/user-group-season.repository'
import { UserGroupSeasonTopicService } from './user-group-season-topic.service'

@Injectable()
export class UserGroupSeasonService {
  constructor(
    private readonly userGroupSeasonRepository: UserGroupSeasonRepository,
    private readonly userGroupSeasonTopicService: UserGroupSeasonTopicService,
  ) {
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

  async userGroupSeason({ seasonId, groupId, userId }: UserGroupSeasonId) {
    /// TODO generate stat here
    const userStat = await this.userGroupSeasonRepository.findOne({
      userId_groupId_seasonId: { seasonId, groupId, userId },
    })
    const userTopics = await this.userGroupSeasonTopicService.userGroupSeasonTopics({
      userId, groupId, seasonId,
    })
    return userStat
  }

  async removeUserGroupSeason({ seasonId, groupId, userId }: UserGroupSeasonId) {
    return this.userGroupSeasonRepository.remove({
      userId_groupId_seasonId: { seasonId, groupId, userId },
    })
  }
}
