import { Args, Query, Resolver } from '@nestjs/graphql'
import { UserGroupSeasonContestProblem } from './entities/user-group-season-contest-problem.entity'
import { UserGroupSeasonContestProblemService } from './user-group-season-contest-problem.service'
import { UserGroupSeasonContestProblemId } from './dto/create-user-group-season-contest-problem.input'

@Resolver(() => UserGroupSeasonContestProblem)
export class UserGroupSeasonContestProblemResolver {
  constructor(
    private readonly userGroupSeasonContestProblemService: UserGroupSeasonContestProblemService,
  ) {}

  @Query(() => UserGroupSeasonContestProblem)
  async userGroupSeasonContestProblem(
    @Args('userGroupSeasonContestProblemId') userGroupSeasonContestProblemId: UserGroupSeasonContestProblemId,
  ) {
    return this.userGroupSeasonContestProblemService.userGroupSeasonContestProblem(userGroupSeasonContestProblemId)
  }

  // @Query(() => PaginationUserGroupSeasonContestProblem)
  // async userGroupSeasonContestProblems(
  //   @Args('filterUserGroupSeasonContestProblemInput', { nullable: true})
  //   filterUserGroupSeasonContestProblemInput?: FilterUserGroupSeasonContestProblemInput,
  //   @Args('pageInfoInput', {  nullable: true }) pageInfoInput?: PaginationInput,
  // ) {
  //   return this.userGroupSeasonContestProblemService.userGroupSeasonContestProblems(filterUserGroupSeasonContestProblemInput, pageInfoInput)
  // }
  //
  // @Mutation(() => UserGroupSeasonContestProblem)
  // async updateUserGroupSeasonContestProblem(
  //   @Args('updateUserGroupSeasonContestProblemInput')
  //   updateUserGroupSeasonContestProblemInput: UpdateUserGroupSeasonContestProblemInput,
  // ) {
  //   return this.userGroupSeasonContestProblemService.updateUserGroupSeasonContestProblem(updateUserGroupSeasonContestProblemInput)
  // }
  //
  // @Mutation(() => Int)
  // async removeUserGroupSeasonContestProblem(
  //   @Args('userGroupSeasonContestProblemId')
  //   userGroupSeasonContestProblemId: UserGroupSeasonContestProblemId,
  // ) {
  //   return this.userGroupSeasonContestProblemService.removeUserGroupSeasonContestProblem(
  //     userGroupSeasonContestProblemId,
  //   )
  // }
}
