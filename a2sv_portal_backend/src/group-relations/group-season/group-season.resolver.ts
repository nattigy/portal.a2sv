import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GroupSeasonService } from './group-season.service'
import { GroupSeason } from './entities/group-season.entity'
import { CreateGroupSeasonInput, GroupSeasonId } from './dto/create-group-season.input'
import { PaginationInput } from '../../common/page/pagination.input'
import {
  UpdateGroupSeasonInput,
  UpdateGroupSeasonJoinRequestInput,
} from './dto/update-group-season.input'
import { PaginationGroupSeason } from '../../common/page/pagination-info'

@Resolver(() => GroupSeason)
export class GroupSeasonResolver {
  constructor(private readonly groupSeasonService: GroupSeasonService) {}

  @Mutation(() => GroupSeason)
  async addGroupToASeason(
    @Args('addGroupToASeasonInput') createGroupSeasonInput: CreateGroupSeasonInput,
  ): Promise<GroupSeason> {
    return this.groupSeasonService.addGroupToASeason(createGroupSeasonInput)
  }

  @Query(() => GroupSeason)
  async groupSeason(
    @Args('groupSeasonId') groupSeasonId: GroupSeasonId,
  ): Promise<GroupSeason> {
    return this.groupSeasonService.groupSeason(groupSeasonId)
  }

  @Query(() => PaginationGroupSeason)
  async groupSeasons(
    @Args('groupId') groupId: string,
    @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  ): Promise<PaginationGroupSeason> {
    return this.groupSeasonService.groupsSeasons({ groupId }, paginationInput)
  }

  // @Query(() => PaginationGroupSeason)
  // async seasonGroups(
  //   @Args('seasonId') seasonId: string,
  //   @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  // ): Promise<PaginationGroupSeason> {
  //   return this.groupSeasonService.groupsSeasons({ seasonId }, paginationInput)
  // }

  @Mutation(() => GroupSeason)
  async updateGroupSeason(
    @Args('updateGroupSeasonInput') updateGroupSeasonInput: UpdateGroupSeasonInput,
  ): Promise<GroupSeason> {
    return this.groupSeasonService.updateGroupSeason(updateGroupSeasonInput)
  }

  @Mutation(() => GroupSeason)
  async updateGroupSeasonJoinRequest(
    @Args('updateGroupSeasonJoinRequestInput')
    updateGroupSeasonJoinRequestInput: UpdateGroupSeasonJoinRequestInput,
  ): Promise<GroupSeason> {
    return this.groupSeasonService.updateGroupSeasonJoinRequest(
      updateGroupSeasonJoinRequestInput,
    )
  }

  @Mutation(() => GroupSeason)
  async removeSeasonFromAGroup(@Args('groupSeasonId') groupSeasonId: GroupSeasonId) {
    return this.groupSeasonService.removeGroupSeason(groupSeasonId)
  }
}
