import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GroupSeasonService } from './group-season.service'
import { GroupSeason } from './entities/group-season.entity'
import { CreateGroupSeasonInput, GroupSeasonId } from './dto/create-group-season.input'
import { FilterGroupSeasonInput } from './dto/filter-group-season.input'
import { PaginationInput } from '../common/page/pagination.input'

@Resolver(() => GroupSeason)
export class GroupSeasonResolver {
  constructor(private readonly groupSeasonService: GroupSeasonService) {
  }

  @Mutation(() => GroupSeason)
  async addSeasonToAGroup(
    @Args('addSeasonToAGroupInput') createGroupSeasonInput: CreateGroupSeasonInput,
  ): Promise<GroupSeason> {
    return this.groupSeasonService.addSeasonToAGroup(createGroupSeasonInput)
  }

  @Query(() => GroupSeason)
  async groupSeasonStat(@Args('groupSeasonId') groupSeasonId: GroupSeasonId): Promise<GroupSeason> {
    return this.groupSeasonService.groupSeasonStat(groupSeasonId)
  }

  @Query(() => [GroupSeason])
  async groupSeasonsStats(
    @Args('groupId') groupId: string,
    @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
    ): Promise<GroupSeason[]> {
    return this.groupSeasonService.groupsSeasonsStats({ groupId },paginationInput)
  }

  @Query(() => [GroupSeason])
  async seasonGroupsStats(
    @Args('seasonId') seasonId: string,
    @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
    ): Promise<GroupSeason[]> {
    return this.groupSeasonService.groupsSeasonsStats({ seasonId },paginationInput)
  }

  @Mutation(() => GroupSeason)
  async removeSeasonFromAGroup(@Args('groupSeasonId') groupSeasonId: GroupSeasonId) {
    return this.groupSeasonService.removeGroupSeason(groupSeasonId)
  }
}
