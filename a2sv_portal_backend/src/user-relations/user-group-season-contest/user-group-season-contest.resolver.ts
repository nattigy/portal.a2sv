import { Resolver } from '@nestjs/graphql'
import { UserGroupSeasonContest } from './entities/user-group-season-contest.entity'
import { UserGroupSeasonContestService } from './user-group-season-contest.service'

@Resolver(() => UserGroupSeasonContest)
export class UserGroupSeasonContestResolver {
  constructor(private readonly userGroupSeasonContestService: UserGroupSeasonContestService) {}

  // @Query(() => UserGroupSeasonContest)
  // async userGroupSeasonContest(
  //   @Args('userGroupSeasonContestId') userGroupSeasonContestId: UserGroupSeasonContestId,
  // ): Promise<UserGroupSeasonContest> {
  //   return this.userGroupSeasonContestService.userGroupSeasonContest(userGroupSeasonContestId)
  // }
  //
  // @Query(() => PaginationUserGroupSeasonContest)
  // async userGroupSeasonContests(
  //   @Args('filterUserGroupSeasonContestInput') filterUserGroupSeasonContestInput: FilterUserGroupSeasonContestInput,
  //   @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  // ): Promise<PaginationUserGroupSeasonContest> {
  //   return this.userGroupSeasonContestService.userGroupSeasonContests(filterUserGroupSeasonContestInput, paginationInput)
  // }
  //
  // @Mutation(() => UserGroupSeasonContest)
  // async updateUserGroupSeasonContest(
  //   @Args('updateUserGroupSeasonContestInput')
  //     updateUserContestInput: UpdateUserGroupSeasonContestInput,
  // ): Promise<UserGroupSeasonContest> {
  //   return this.userGroupSeasonContestService.updateUserGroupSeasonContest(updateUserContestInput)
  // }
  //
  // @Mutation(() => UserGroupSeasonContestProblem)
  // async updateUserContestProblem(
  //   @Args('updateUserGroupSeasonContestProblemInput')
  //   updateUserContestProblemInput: UpdateUserGroupSeasonContestProblemInput,
  // ) {
  //   return this.userGroupSeasonContestService.updateUserContestProblem(updateUserContestProblemInput)
  // }
  //
  // @Mutation(() => Int)
  // async removeUserGroupSeasonContest(
  //   @Args('userGroupSeasonContestId') userGroupSeasonContestId: UserGroupSeasonContestId,
  // ): Promise<number> {
  //   return this.userGroupSeasonContestService.removeUserGroupSeasonContest(userGroupSeasonContestId)
  // }
}
