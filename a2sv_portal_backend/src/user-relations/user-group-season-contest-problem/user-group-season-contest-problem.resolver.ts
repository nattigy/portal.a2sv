import { Resolver } from '@nestjs/graphql'
import { UserSeasonContestProblem } from './entities/user-season-contest-problem.entity'
import { UserGroupSeasonContestProblemService } from './user-group-season-contest-problem.service'

@Resolver(() => UserSeasonContestProblem)
export class UserGroupSeasonContestProblemResolver {
  constructor(private readonly userContestProblemService: UserGroupSeasonContestProblemService) {}

  // @Query(() => PaginationUserSeasonContestProblem)
  // async userContestProblems(
  //   @Args('filterUserContestProblemInput', { nullable: true})
  //   filterUserContestProblemInput?: FilterUserContestProblemInput,
  //   @Args('pageInfoInput', {  nullable: true }) pageInfoInput?: PaginationInput,
  // ) {
  //   return this.userContestProblemService.userContestProblems(filterUserContestProblemInput, pageInfoInput)
  // }
  //
  // @Query(() => UserSeasonContestProblem)
  // async userContestProblem(
  //   @Args('userContestProblemId') userContestProblemId: UserContestProblemId,
  // ) {
  //   return this.userContestProblemService.userContestProblem(userContestProblemId)
  // }
  //
  // @Mutation(() => UserSeasonContestProblem)
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
