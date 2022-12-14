import { Args, Query, Resolver } from '@nestjs/graphql'

import { UserGroupSeasonId } from './dto/create-group-user-season.input'
import { UserGroupSeason } from './entities/user-group-season.entity'
import { UserGroupSeasonService } from './user-group-season.service'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterUserGroupSeasonInput } from './dto/filter-user-group-season-input'

@Resolver(() => UserGroupSeason)
export class UserGroupSeasonResolver {
  constructor(private readonly UserGroupSeasonService: UserGroupSeasonService) {}

  @Query(() => UserGroupSeason)
  async UserGroupSeason(@Args('UserGroupSeasonId') UserGroupSeasonId: UserGroupSeasonId): Promise<UserGroupSeason> {
    return this.UserGroupSeasonService.UserGroupSeason(UserGroupSeasonId)
  }

  @Query(() => UserGroupSeason)
  async UserGroupSeasons(
    @Args('filterUserGroupSeasonInput') filterUserGroupSeasonInput: FilterUserGroupSeasonInput,
    @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  ): Promise<UserGroupSeason[]> {
    return this.UserGroupSeasonService.UserGroupSeasons(filterUserGroupSeasonInput, paginationInput)
  }
}
