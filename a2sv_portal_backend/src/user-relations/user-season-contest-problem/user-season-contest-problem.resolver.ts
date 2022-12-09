import { Resolver } from '@nestjs/graphql'
import { UserSeasonContestProblem } from './entities/user-season-contest-problem.entity'
import { UserSeasonContestProblemService } from './user-season-contest-problem.service'

@Resolver(() => UserSeasonContestProblem)
export class UserSeasonContestProblemResolver {
  constructor(private readonly userContestProblemService: UserSeasonContestProblemService) {}

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
  //   updateUserContestProblemInput: UpdateUserContestProblemInput,
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
