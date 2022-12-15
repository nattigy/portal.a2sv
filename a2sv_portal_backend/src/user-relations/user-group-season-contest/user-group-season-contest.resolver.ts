import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserGroupSeasonContest } from './entities/user-group-season-contest.entity'
import { UserGroupSeasonContestService } from './user-group-season-contest.service'
import { UserGroupSeasonContestId } from './dto/create-user-group-season-contest.input'
import { PaginationUserGroupSeasonContest } from '../../common/page/pagination-info'
import { FilterUserGroupSeasonContestInput } from './dto/filter-user-group-season-contest.input'
import { PaginationInput } from '../../common/page/pagination.input'
import { UpdateUserGroupSeasonContestInput } from './dto/update-user-group-season-contest.input'
import { UpdateUserGroupSeasonContestProblemInput } from '../user-group-season-contest-problem/dto/update-user-group-season-contest-problem.input'
import { UserGroupSeasonContestProblem } from '../user-group-season-contest-problem/entities/user-group-season-contest-problem.entity'

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
