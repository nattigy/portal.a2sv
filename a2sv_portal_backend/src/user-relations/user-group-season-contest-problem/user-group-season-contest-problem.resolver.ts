import { Resolver } from '@nestjs/graphql'
import { UserGroupSeasonContestProblem } from './entities/user-season-contest-problem.entity'
import { UserGroupSeasonContestProblemService } from './user-group-season-contest-problem.service'

@Resolver(() => UserGroupSeasonContestProblem)
export class UserGroupSeasonContestProblemResolver {
  constructor(private readonly userContestProblemService: UserGroupSeasonContestProblemService) {}

  // @Query(() => PaginationUserGroupSeasonContestProblem)
  // async userContestProblems(
  //   @Args('filterUserContestProblemInput', { nullable: true})
  //   filterUserContestProblemInput?: FilterUserContestProblemInput,
  //   @Args('pageInfoInput', {  nullable: true }) pageInfoInput?: PaginationInput,
  // ) {
  //   return this.userContestProblemService.userContestProblems(filterUserContestProblemInput, pageInfoInput)
  // }
  //
  // @Query(() => UserGroupSeasonContestProblem)
  // async userContestProblem(
  //   @Args('userContestProblemId') userContestProblemId: UserContestProblemId,
  // ) {
  //   return this.userContestProblemService.userContestProblem(userContestProblemId)
  // }
  //
  // @Mutation(() => UserGroupSeasonContestProblem)
  // async updateUserContestProblem(
  //   @Args('updateUserContestProblemInput')
  //   updateUserContestProblemInput: UpdateUserGroupContestProblemInput,
  // ) {
  //   return this.userContestProblemService.updateUserContestProblem(updateUserContestProblemInput)
  // }
  //
  // @Mutation(() => Int)
  // async removeUserContestProblem(
  //   @Args('userContestProblemId') userContestProblemId: UserContestProblemId,
  // ) {
  //   return this.userContestProblemService.removeUserContestProblem(userContestProblemId)
  // }
}
