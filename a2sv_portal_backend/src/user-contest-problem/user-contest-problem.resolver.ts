import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserContestProblemService } from './user-contest-problem.service'
import { UserContestProblem } from './entities/user-contest-problem.entity'
import { UpdateUserContestProblemInput } from './dto/update-user-contest-problem.input'

@Resolver(() => UserContestProblem)
export class UserContestProblemResolver {
  constructor(
    private readonly userContestProblemService: UserContestProblemService,
  ) {}

  // @Mutation(() => UserContestProblem)
  // createUserContestProblem(@Args('createUserContestProblemInput') createUserContestProblemInput: CreateUserContestProblemInput) {
  //   return this.userContestProblemService.create(createUserContestProblemInput);
  // }

  @Query(() => [UserContestProblem])
  userContestProblems() {
    return this.userContestProblemService.findAll()
  }

  @Query(() => UserContestProblem)
  userContestProblem(
    @Args('userId') userId: string,
    @Args('contestId') contestId: string,
    @Args('problemId') problemId: string,
  ) {
    return this.userContestProblemService.findOne(userId, contestId, problemId)
  }

  @Mutation(() => UserContestProblem)
  updateUserContestProblem(
    @Args('updateUserContestProblemInput')
    updateUserContestProblemInput: UpdateUserContestProblemInput,
  ) {
    return this.userContestProblemService.update(updateUserContestProblemInput)
  }

  @Mutation(() => UserContestProblem)
  removeUserContestProblem(@Args('id', { type: () => Int }) id: number) {
    return this.userContestProblemService.remove(id)
  }
}
