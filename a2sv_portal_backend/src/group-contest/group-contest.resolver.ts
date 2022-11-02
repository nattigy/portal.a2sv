import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GroupContestService } from './group-contest.service'
import { GroupContest } from './entities/group-contest.entity'
import { UpdateGroupContestInput } from './dto/update-group-contest.input'
import { FindGroupContestInput } from './dto/find-group-contest.input'
import { GroupContestStat } from './dto/group-contest-stat-response'

@Resolver(() => GroupContest)
export class GroupContestResolver {
  constructor(private readonly groupContestService: GroupContestService) {}

  // @Mutation(() => GroupContest)
  // createGroupContest(@Args('createGroupContestInput') createGroupContestInput: CreateGroupContestInput) {
  //   return this.groupContestService.create(createGroupContestInput);
  // }

  // @Query(() => [GroupContest], { name: 'groupContests' })
  // async findAll() {
  //   return this.groupContestService.findAll();
  // }

  @Query(() => GroupContestStat)
  async groupContestStat(
    @Args('findGroupContestInput') findGroupContestInput: FindGroupContestInput,
  ): Promise<GroupContestStat> {
    return this.groupContestService.groupContestStat(findGroupContestInput)
  }

  @Query(() => GroupContest, { name: 'groupContest' })
  async findOne(
    @Args('findGroupContestInput') findGroupContestInput: FindGroupContestInput,
  ) {
    return this.groupContestService.findOne(findGroupContestInput)
  }

  @Mutation(() => GroupContest)
  updateGroupContest(
    @Args('updateGroupContestInput')
    updateGroupContestInput: UpdateGroupContestInput,
  ) {
    return this.groupContestService.update(
      updateGroupContestInput.id,
      updateGroupContestInput,
    )
  }

  @Mutation(() => GroupContest)
  removeGroupContest(@Args('id', { type: () => Int }) id: number) {
    return this.groupContestService.remove(id)
  }
}
