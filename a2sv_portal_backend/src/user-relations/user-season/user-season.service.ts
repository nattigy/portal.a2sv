import { Injectable } from '@nestjs/common'
import { PaginationInput } from 'src/common/page/pagination.input'
import { UserSeasonId } from './dto/create-user-season.input'
import { FilterUserSeasonInput } from './dto/filter-user-season-input'
import { UserSeasonRepository } from './user-season.repository'

@Injectable()
export class UserSeasonService {
  constructor(private readonly userSeasonRepository: UserSeasonRepository) {
  }

  async userSeasons(
    { seasonId, userId }: FilterUserSeasonInput,
    { take, skip }: PaginationInput = { take: 50, skip: 0 },
  ) {
    /// TODO generate multiple stat here
    return this.userSeasonRepository.findAll({
      where: { seasonId, userId },
    })
  }

  async userSeason({ seasonId, userId }: UserSeasonId) {
    /// TODO generate stat here
    return this.userSeasonRepository.findOne({
      userId_seasonId: { seasonId, userId },
    })
  }

  async removeUserSeason({ seasonId, userId }: UserSeasonId) {
    return this.userSeasonRepository.remove({
      userId_seasonId: { seasonId, userId },
    })
  }
}
