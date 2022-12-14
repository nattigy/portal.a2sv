import { Args, Query, Resolver } from '@nestjs/graphql'

import { UserGroupSeasonId } from './dto/create-group-user-season.input'
import { UserGroupSeason } from './entities/user-group-season.entity'
import { UserGroupSeasonService } from './user-group-season.service'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterUserGroupSeasonInput } from './dto/filter-user-group-season-input'

@Resolver(() => UserGroupSeason)
export class UserGroupSeasonResolver {
  constructor(private readonly userSeasonService: UserGroupSeasonService) {}

  @Query(() => UserGroupSeason)
  async userSeason(@Args('userSeasonId') userSeasonId: UserGroupSeasonId): Promise<UserGroupSeason> {
    return this.userSeasonService.userSeason(userSeasonId)
  }

  @Query(() => UserGroupSeason)
  async userSeasons(
    @Args('filterUserSeasonInput') filterUserSeasonInput: FilterUserGroupSeasonInput,
    @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  ): Promise<UserGroupSeason[]> {
    return this.userSeasonService.userSeasons(filterUserSeasonInput, paginationInput)
  }
}
