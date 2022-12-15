import { Args, Int, Mutation, Resolver } from '@nestjs/graphql'
import { UserGroupSeasonContestProblem } from './entities/user-group-season-contest-problem.entity'
import { UserGroupSeasonContestProblemService } from './user-group-season-contest-problem.service'
import { UserGroupSeasonContestProblemId } from './dto/create-user-group-season-contest-problem.input'

@Resolver(() => UserGroupSeasonContestProblem)
export class UserGroupSeasonContestProblemResolver {
  constructor(
    private readonly userGroupContestProblemService: UserGroupSeasonContestProblemService,
  ) {}

  // @Query(() => PaginationUserGroupSeasonContestProblem)
  // async userContestProblems(
  //   @Args('filterUserContestProblemInput', { nullable: true})
  //   filterUserContestProblemInput?: FilterUserContestProblemInput,
  //   @Args('pageInfoInput', {  nullable: true }) pageInfoInput?: PaginationInput,
  // ) {
  //   return this.userGroupContestProblemService.userContestProblems(filterUserContestProblemInput, pageInfoInput)
  // }
  //
  // @Query(() => UserGroupSeasonContestProblem)
  // async userContestProblem(
  //   @Args('userContestProblemId') userContestProblemId: UserContestProblemId,
  // ) {
  //   return this.userGroupContestProblemService.userContestProblem(userContestProblemId)
  // }
  //
  // @Mutation(() => UserGroupSeasonContestProblem)
  // async updateUserContestProblem(
  //   @Args('updateUserContestProblemInput')
  //   updateUserContestProblemInput: UpdateUserGroupSeasonContestProblemInput,
  // ) {
  //   return this.userGroupContestProblemService.updateUserContestProblem(updateUserContestProblemInput)
  // }
  //
  @Mutation(() => Int)
  async removeUserGroupContestProblem(
    @Args('userGroupSeasonContestProblemId')
    userGroupSeasonContestProblemId: UserGroupSeasonContestProblemId,
  ) {
    return this.userGroupContestProblemService.removeUserGroupContestProblem(
      userGroupSeasonContestProblemId,
    )
  }
}
