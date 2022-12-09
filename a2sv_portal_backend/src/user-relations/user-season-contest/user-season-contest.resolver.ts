import { Resolver } from '@nestjs/graphql'
import { UserSeasonContest } from './entities/user-season-contest.entity'
import { UserSeasonContestService } from './user-season-contest.service'

@Resolver(() => UserSeasonContest)
export class UserSeasonContestResolver {
  constructor(private readonly userSeasonContestService: UserSeasonContestService) {
  }

  // @Query(() => UserSeasonContest)
  // async userContest(
  //   @Args('userSeasonContestId') userSeasonContestId: UserSeasonContestId,
  // ): Promise<UserSeasonContest> {
  //   return this.userSeasonContestService.userContest(userSeasonContestId)
  // }
  //
  // @Query(() => PaginationUserSeasonContest)
  // async userContests(
  //   @Args('filterUserSeasonContestInput') filterUserSeasonContestInput: FilterUserSeasonContestInput,
  //   @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  // ): Promise<PaginationUserSeasonContest> {
  //   return this.userSeasonContestService.userContests(filterUserSeasonContestInput, paginationInput)
  // }
  //
  // @Mutation(() => UserSeasonContest)
  // async updateUserContest(
  //   @Args('updateUserContestInput')
  //     updateUserContestInput: UpdateUserSeasonContestInput,
  // ): Promise<UserSeasonContest> {
  //   return this.userSeasonContestService.updateUserContest(updateUserContestInput)
  // }
  //
  // @Mutation(() => Int)
  // async removeUserSeasonContest(
  //   @Args('userSeasonContestId') userSeasonContestId: UserSeasonContestId,
  // ): Promise<number> {
  //   return this.userSeasonContestService.removeUserSeasonContest(userSeasonContestId)
  // }
}
