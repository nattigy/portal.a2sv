import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { GroupSeasonService } from './group-season.service'
import { GroupSeason } from './entities/group-season.entity'
import { CreateGroupSeasonInput } from './dto/create-group-season.input'
import { UpdateGroupSeasonInput } from './dto/update-group-season.input'

@Resolver(() => GroupSeason)
export class GroupSeasonResolver {
  constructor(private readonly groupSeasonService: GroupSeasonService) {}

  @Mutation(() => GroupSeason)
  createGroupSeason(
    @Args('createGroupSeasonInput') createGroupSeasonInput: CreateGroupSeasonInput,
  ) {
    return this.groupSeasonService.create(createGroupSeasonInput)
  }

  @Query(() => [GroupSeason], { name: 'groupSeason' })
  findAll() {
    return this.groupSeasonService.findAll()
  }

  @Query(() => GroupSeason, { name: 'groupSeason' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.groupSeasonService.findOne(id)
  }

  @Mutation(() => GroupSeason)
  updateGroupSeason(
    @Args('updateGroupSeasonInput') updateGroupSeasonInput: UpdateGroupSeasonInput,
  ) {
    return this.groupSeasonService.update(updateGroupSeasonInput.id, updateGroupSeasonInput)
  }

  @Mutation(() => GroupSeason)
  removeGroupSeason(@Args('id', { type: () => Int }) id: number) {
    return this.groupSeasonService.remove(id)
  }
}
