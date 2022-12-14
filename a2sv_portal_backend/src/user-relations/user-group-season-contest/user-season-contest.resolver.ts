import { Resolver } from '@nestjs/graphql'
import { UserGroupSeasonContest } from './entities/user-season-contest.entity'
import { UserGroupSeasonContestService } from './user-season-contest.service'

@Resolver(() => UserGroupSeasonContest)
export class UserGroupSeasonContestResolver {
  constructor(private readonly UserGroupSeasonContestService: UserGroupSeasonContestService) {}

  // @Query(() => UserGroupSeasonContest)
  // async userContest(
  //   @Args('UserGroupSeasonContestId') UserGroupSeasonContestId: UserGroupSeasonContestId,
  // ): Promise<UserGroupSeasonContest> {
  //   return this.UserGroupSeasonContestService.userContest(UserGroupSeasonContestId)
  // }
  //
  // @Query(() => PaginationUserGroupSeasonContest)
  // async userContests(
  //   @Args('filterUserGroupSeasonContestInput') filterUserGroupSeasonContestInput: FilterUserGroupSeasonContestInput,
  //   @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  // ): Promise<PaginationUserGroupSeasonContest> {
  //   return this.UserGroupSeasonContestService.userContests(filterUserGroupSeasonContestInput, paginationInput)
  // }
  //
  // @Mutation(() => UserGroupSeasonContest)
  // async updateUserContest(
  //   @Args('updateUserContestInput')
  //     updateUserContestInput: UpdateUserGroupSeasonContestInput,
  // ): Promise<UserGroupSeasonContest> {
  //   return this.UserGroupSeasonContestService.updateUserContest(updateUserContestInput)
  // }
  //
  // @Mutation(() => Int)
  // async removeUserGroupSeasonContest(
  //   @Args('UserGroupSeasonContestId') UserGroupSeasonContestId: UserGroupSeasonContestId,
  // ): Promise<number> {
  //   return this.UserGroupSeasonContestService.removeUserGroupSeasonContest(UserGroupSeasonContestId)
  // }
}
