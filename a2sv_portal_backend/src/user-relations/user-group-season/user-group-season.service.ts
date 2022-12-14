import { Injectable } from '@nestjs/common'
import { PaginationInput } from 'src/common/page/pagination.input'
import { UserGroupSeasonId } from './dto/create-group-user-season.input'
import { FilterUserGroupSeasonInput } from './dto/filter-user-group-season-input'
import { UserGroupSeasonRepository } from './user-group-season.repository'

@Injectable()
export class UserGroupSeasonService {
  constructor(private readonly UserGroupSeasonRepository: UserGroupSeasonRepository) {}

  async UserGroupSeasons(
    { seasonId, userId }: FilterUserGroupSeasonInput,
    { take, skip }: PaginationInput = { take: 50, skip: 0 },
  ) {
    /// TODO generate multiple stat here
    return this.UserGroupSeasonRepository.findAll({
      take,
      skip,
      where: { seasonId, userId },
    })
  }

  async UserGroupSeason({ seasonId, userId }: UserGroupSeasonId) {
    /// TODO generate stat here
    return this.UserGroupSeasonRepository.findOne({
      userId_seasonId: { seasonId, userId },
    })
  }

  async removeUserGroupSeason({ seasonId, userId }: UserGroupSeasonId) {
    return this.UserGroupSeasonRepository.remove({
      userId_seasonId: { seasonId, userId },
    })
  }
}
