import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  UpdateUserContestProblemInput,
  UserContestProblemId,
} from './dto/update-user-contest-problem.input'
import { UserContestProblem } from './entities/user-season-contest-problem.entity'
import { UserSeasonContestProblemService } from './user-season-contest-problem.service'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterUserContestProblemInput } from './dto/filter-user-contest-problem'
import { PaginationUserSeasonContestProblem } from '../../common/page/pagination-info'

@Resolver(() => UserContestProblem)
export class UserSeasonContestProblemResolver {
  constructor(private readonly userContestProblemService: UserSeasonContestProblemService) {}

  @Query(() => PaginationUserSeasonContestProblem)
  async userContestProblems(
    @Args('filterUserContestProblemInput', { nullable: true})
    filterUserContestProblemInput?: FilterUserContestProblemInput,
    @Args('pageInfoInput', {  nullable: true }) pageInfoInput?: PaginationInput,
  ) {
    return this.userContestProblemService.userContestProblems(filterUserContestProblemInput, pageInfoInput)
  }

  @Query(() => UserContestProblem)
  async userContestProblem(
    @Args('userContestProblemId') userContestProblemId: UserContestProblemId,
  ) {
    return this.userContestProblemService.userContestProblem(userContestProblemId)
  }

  @Mutation(() => UserContestProblem)
  async updateUserContestProblem(
    @Args('updateUserContestProblemInput')
    updateUserContestProblemInput: UpdateUserContestProblemInput,
  ) {
    return this.userContestProblemService.updateUserContestProblem(updateUserContestProblemInput)
  }

  @Mutation(() => Int)
  async removeUserContestProblem(
    @Args('userContestProblemId') userContestProblemId: UserContestProblemId,
  ) {
    return this.userContestProblemService.removeUserContestProblem(userContestProblemId)
  }
}
