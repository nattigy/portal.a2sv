import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { UserGroupSeasonId } from './dto/create-group-user-season.input'
import { UserGroupSeason } from './entities/user-group-season.entity'
import { UserGroupSeasonService } from './user-group-season.service'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterUserGroupSeasonInput } from './dto/filter-user-group-season-input'

@Resolver(() => UserGroupSeason)
export class UserGroupSeasonResolver {
  constructor(private readonly userGroupSeasonService: UserGroupSeasonService) {}

  @Query(() => UserGroupSeason)
  async userGroupSeason(@Args('userGroupSeasonId') userGroupSeasonId: UserGroupSeasonId): Promise<UserGroupSeason> {
    return this.userGroupSeasonService.userGroupSeason(userGroupSeasonId)
  }

  @Query(() => UserGroupSeason)
  async userGroupSeasons(
    @Args('filterUserGroupSeasonInput') filterUserGroupSeasonInput: FilterUserGroupSeasonInput,
    @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  ): Promise<UserGroupSeason[]> {
    return this.userGroupSeasonService.userGroupSeasons(filterUserGroupSeasonInput, paginationInput)
  }

  @Mutation(() => UserGroupSeason)
  async removeUserGroupSeason(@Args('userGroupSeasonId') userGroupSeasonId: UserGroupSeasonId) {
    return this.userGroupSeasonService.removeUserGroupSeason(userGroupSeasonId)
  }
}
