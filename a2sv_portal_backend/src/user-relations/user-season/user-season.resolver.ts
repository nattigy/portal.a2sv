import { Args, Query, Resolver } from '@nestjs/graphql'

import { UserSeasonId } from './dto/create-user-season.input'
import { UserSeason } from './entities/user-season.entity'
import { UserSeasonService } from './user-season.service'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterUserSeasonInput } from './dto/filter-user-season-input'

@Resolver(() => UserSeason)
export class UserSeasonResolver {
  constructor(private readonly userSeasonService: UserSeasonService) {}

  @Query(() => UserSeason)
  async userSeason(@Args('userSeasonId') userSeasonId: UserSeasonId): Promise<UserSeason> {
    return this.userSeasonService.userSeason(userSeasonId)
  }

  @Query(() => UserSeason)
  async userSeasons(
    @Args('filterUserSeasonInput') filterUserSeasonInput: FilterUserSeasonInput,
    @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  ): Promise<UserSeason[]> {
    return this.userSeasonService.userSeasons(filterUserSeasonInput, paginationInput)
  }
}
