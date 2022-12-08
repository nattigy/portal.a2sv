import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GroupSeasonService } from './group-season.service'
import { GroupSeason } from './entities/group-season.entity'
import { CreateGroupSeasonInput, GroupSeasonId } from './dto/create-group-season.input'
import { PaginationInput } from '../../common/page/pagination.input'
import { UpdateGroupSeasonInput } from './dto/update-group-season.input'
import { PaginationGroupSeason } from '../../common/page/pagination-info'

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

  @Query(() => PaginationGroupSeason)
  async groupSeasonsStats(
    @Args('groupId') groupId: string,
    @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  ): Promise<PaginationGroupSeason> {
    return this.groupSeasonService.groupsSeasonsStats({ groupId }, paginationInput)
  }

  @Query(() => PaginationGroupSeason)
  async seasonGroupsStats(
    @Args('seasonId') seasonId: string,
    @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  ): Promise<PaginationGroupSeason> {
    return this.groupSeasonService.groupsSeasonsStats({ seasonId }, paginationInput)
  }

  @Query(() => GroupSeason)
  async updateGroupSeason(@Args('updateGroupSeasonInput') updateGroupSeasonInput: UpdateGroupSeasonInput): Promise<GroupSeason> {
    return this.groupSeasonService.updateGroupSeason(updateGroupSeasonInput)
  }

  @Query(() => GroupSeason)
  async updateJoinRequestGroupSeason(
    @Args('updateGroupSeasonInput') updateGroupSeasonInput: UpdateGroupSeasonInput,
  ): Promise<GroupSeason> {
    return this.groupSeasonService.updateJoinRequestGroupSeason(updateGroupSeasonInput)
  }

  @Mutation(() => GroupSeason)
  async removeSeasonFromAGroup(@Args('groupSeasonId') groupSeasonId: GroupSeasonId) {
    return this.groupSeasonService.removeGroupSeason(groupSeasonId)
  }
}
