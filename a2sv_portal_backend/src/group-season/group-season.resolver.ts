import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GroupSeasonService } from './group-season.service'
import { GroupSeason } from './entities/group-season.entity'
import { CreateGroupSeasonInput, GroupSeasonId } from './dto/create-group-season.input'

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
  async groupSeasonStat(@Args('groupSeasonId') groupSeasonId: GroupSeasonId) {
    return this.groupSeasonService.groupSeasonStat(groupSeasonId)
  }

  @Query(() => GroupSeason)
  async groupSeasonOverAllStat(@Args('groupId') groupId: string) {
    return this.groupSeasonService.groupSeasonOverAllStat(groupId)
  }

  @Mutation(() => GroupSeason)
  async removeGroupSeason(@Args('groupSeasonId') groupSeasonId: GroupSeasonId) {
    return this.groupSeasonService.removeGroupSeason(groupSeasonId)
  }
}
