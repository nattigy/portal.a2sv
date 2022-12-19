import { Injectable } from '@nestjs/common'
import { PaginationInput } from 'src/common/page/pagination.input'
import { UserGroupSeasonId } from '../../app/user-group-season/dto/create-group-user-season.input'
import { FilterUserGroupSeasonInput } from '../../app/user-group-season/dto/filter-user-group-season-input'
import { UserGroupSeasonRepository } from '../../app/user-group-season/user-group-season.repository'

@Injectable()
export class UserGroupSeasonService {
  constructor(private readonly userGroupSeasonRepository: UserGroupSeasonRepository) {}

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
    return this.userGroupSeasonRepository.findOne({
      userId_groupId_seasonId: { seasonId, groupId, userId },
    })
  }

  async removeUserGroupSeason({ seasonId, groupId, userId }: UserGroupSeasonId) {
    return this.userGroupSeasonRepository.remove({
      userId_groupId_seasonId: { seasonId, groupId, userId },
    })
  }
}
