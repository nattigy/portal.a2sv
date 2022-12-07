import { Injectable } from '@nestjs/common'
import { PaginationInput } from 'src/common/page/pagination.input'
import { CreateUserSeasonInput, UserSeasonId } from './dto/create-user-season.input'
import { FilterUserSeasonInput } from './dto/filter-user-season-input'
import { UpdateUserSeasonInput } from './dto/update-user-season.input'
import { UserSeasonRepository } from './user-season.repository'

@Injectable()
export class UserSeasonService {
  constructor(private readonly userSeasonRepository: UserSeasonRepository) {}

  async usersSeasonsStats(
    { seasonId, userId }: FilterUserSeasonInput,
    paginationInput: PaginationInput,
  ) {
    //generate multiple state here
    return this.userSeasonRepository.findAll({
      where: { seasonId, userId },
    })
  }
  async userSeasonStat({ seasonId, userId }: UserSeasonId) {
    //generate state here
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
