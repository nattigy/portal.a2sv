import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GroupSeasonContestService } from './group-season-contest.service'
import { GroupSeasonContest } from './entities/group-season-contest.entity'
import { CreateGroupSeasonContestInput } from './dto/create-group-season-contest.input'
import { UpdateGroupSeasonContestInput } from './dto/update-group-season-contest.input'

@Resolver(() => GroupSeasonContest)
export class GroupSeasonContestResolver {
  constructor(private readonly groupSeasonContestService: GroupSeasonContestService) {
  }

  @Mutation(() => GroupSeasonContest)
  createGroupSeasonContest(
    @Args('createGroupSeasonContestInput')
      createGroupSeasonContestInput: CreateGroupSeasonContestInput,
  ) {
    return this.groupSeasonContestService.create(createGroupSeasonContestInput)
  }

  @Query(() => [GroupSeasonContest], { name: 'groupSeasonContest' })
  findAll() {
    return this.groupSeasonContestService.findAll()
  }

  @Query(() => GroupSeasonContest, { name: 'groupSeasonContest' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.groupSeasonContestService.findOne(id)
  }

  @Mutation(() => GroupSeasonContest)
  updateGroupSeasonContest(
    @Args('updateGroupSeasonContestInput')
      updateGroupSeasonContestInput: UpdateGroupSeasonContestInput,
  ) {
    return this.groupSeasonContestService.update(
      updateGroupSeasonContestInput.id,
      updateGroupSeasonContestInput,
    )
  }

  @Mutation(() => GroupSeasonContest)
  removeGroupSeasonContest(@Args('id', { type: () => Int }) id: number) {
    return this.groupSeasonContestService.remove(id)
  }
}
