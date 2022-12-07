import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationInput } from '../common/page/pagination.input'
import { UserSeasonId } from './dto/create-user-season.input'
import { UserSeason } from './entities/user-season.entity'
import { UserSeasonService } from './user-season.service'

@Resolver(() => UserSeason)
export class GroupSeasonResolver {
  constructor(private readonly userSeasonService: UserSeasonService) {}

  @Query(() => UserSeason)
  async userSeasonStat(@Args('userSeasonId') userSeasonId: UserSeasonId): Promise<UserSeason> {
    return this.userSeasonService.userSeasonStat(userSeasonId)
  }

  @Query(() => UserSeason)
  async userSeasonsStats(
    @Args('userId') userId: string,
    @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  ): Promise<UserSeason[]> {
    return this.userSeasonService.usersSeasonsStats({ userId }, paginationInput)
  }

  @Mutation(() => UserSeason)
  async removeSeasonFromAGroup(@Args('userSeasonId') userSeasonId: UserSeasonId) {
    return this.userSeasonService.removeUserSeason(userSeasonId)
  }
}
