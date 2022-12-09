import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserSeasonContest } from './entities/user-season-contest.entity'
import { UserSeasonContestService } from './user-season-contest.service'
import { UserSeasonContestId } from './dto/create-user-season-contest.input'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterUserSeasonContestInput } from './dto/filter-user-season-contest.input'
import { PaginationUserSeasonContest } from '../../common/page/pagination-info'
import { UpdateUserSeasonContestInput } from './dto/update-user-season-contest.input'

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
