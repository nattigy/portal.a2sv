import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UpdateUserContestProblemInput } from './dto/update-user-contest-problem.input'
import { UserContestProblem } from './entities/user-contest-problem.entity'
import { UserContestProblemService } from './user-contest-problem.service'
import { FilterGroupInput } from '../group/dto/filter-group.input'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { FilterUserContestProblemInput } from './dto/filter-user-contest-problem'
import { PaginationUserContestProblem } from '../common/page/pagination-info'

@Resolver(() => UserContestProblem)
export class UserContestProblemResolver {
  constructor(private readonly userContestProblemService: UserContestProblemService) {}

  // @Mutation(() => UserContestProblem)
  // async createUserContestProblem(@Args('createUserContestProblemInput') createUserContestProblemInput: CreateUserContestProblemInput) {
  //   return this.userContestProblemService.create(createUserContestProblemInput);
  // }

  @Query(() => PaginationUserContestProblem)
  async userContestProblems(
    @Args('filterUserContestProblemInput', { type: () => FilterGroupInput, nullable: true })
    filterUserContestProblemInput?: FilterUserContestProblemInput,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput?: PaginationInfoInput,
  ) {
    return this.userContestProblemService.findAll(filterUserContestProblemInput, pageInfoInput)
  }

  @Query(() => UserContestProblem)
  async userContestProblem(
    @Args('userId') userId: string,
    @Args('contestId') contestId: string,
    @Args('problemId') problemId: string,
  ) {
    return this.userContestProblemService.findOne(userId, contestId, problemId)
  }

  @Mutation(() => UserContestProblem)
  async updateUserContestProblem(
    @Args('updateUserContestProblemInput')
    updateUserContestProblemInput: UpdateUserContestProblemInput,
  ) {
    return this.userContestProblemService.update(updateUserContestProblemInput)
  }

  @Mutation(() => UserContestProblem)
  async removeUserContestProblem(@Args('id', { type: () => Int }) id: number) {
    return this.userContestProblemService.remove(id)
  }
}
