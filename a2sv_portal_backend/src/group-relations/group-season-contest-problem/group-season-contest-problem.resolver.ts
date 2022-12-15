import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GroupSeasonContestProblemService } from './group-season-contest-problem.service'
import { GroupSeasonContestProblem } from './entities/group-season-contest-problem.entity'
import { CreateGroupSeasonContestProblemInput } from './dto/create-group-season-contest-problem.input'
import { UpdateGroupSeasonContestProblemInput } from './dto/update-group-season-contest-problem.input'

@Resolver(() => GroupSeasonContestProblem)
export class GroupSeasonContestProblemResolver {
  constructor(
    private readonly groupSeasonContestProblemService: GroupSeasonContestProblemService,
  ) {}

  // @Mutation(() => GroupSeasonContestProblem)
  // createGroupSeasonContestProblem(
  //   @Args('createGroupSeasonContestProblemInput')
  //   createGroupSeasonContestProblemInput: CreateGroupSeasonContestProblemInput,
  // ) {
  //   return this.groupSeasonContestProblemService.create(createGroupSeasonContestProblemInput)
  // }
  //
  // @Query(() => [GroupSeasonContestProblem], { name: 'groupSeasonContestProblem' })
  // findAll() {
  //   return this.groupSeasonContestProblemService.findAll()
  // }
  //
  // @Query(() => GroupSeasonContestProblem, { name: 'groupSeasonContestProblem' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.groupSeasonContestProblemService.findOne(id)
  // }
  //
  // @Mutation(() => GroupSeasonContestProblem)
  // updateGroupSeasonContestProblem(
  //   @Args('updateGroupSeasonContestProblemInput')
  //   updateGroupSeasonContestProblemInput: UpdateGroupSeasonContestProblemInput,
  // ) {
  //   return this.groupSeasonContestProblemService.update(
  //     updateGroupSeasonContestProblemInput.id,
  //     updateGroupSeasonContestProblemInput,
  //   )
  // }
  //
  // @Mutation(() => GroupSeasonContestProblem)
  // removeGroupSeasonContestProblem(@Args('id', { type: () => Int }) id: number) {
  //   return this.groupSeasonContestProblemService.remove(id)
  // }
}
