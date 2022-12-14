import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UpdateUserGroupSeasonTopicProblemInput } from './dto/update-user-season-topic-problem.input'
import { UserGroupSeasonTopicProblem } from './entities/user-season-topic-problem.entity'
import { UserGroupSeasonTopicProblemService } from './user-season-topic-problem.service'
import { UserGroupSeasonTopicProblemId } from './dto/create-user-season-topic-problem.input'
import { PaginationUserGroupSeasonTopicProblem } from '../../common/page/pagination-info'
import { FilterUserGroupSeasonTopicProblemInput } from './dto/filter-user-season-topic-problem.input'
import { PaginationInput } from '../../common/page/pagination.input'

@Resolver(() => UserGroupSeasonTopicProblem)
export class UserGroupSeasonTopicProblemResolver {
  constructor(private readonly seasonTopicUserProblemService: UserGroupSeasonTopicProblemService) {}

  @Query(() => UserGroupSeasonTopicProblem)
  async UserGroupSeasonTopicProblem(
    @Args('UserGroupSeasonTopicProblemId') UserGroupSeasonTopicProblemId: UserGroupSeasonTopicProblemId,
  ): Promise<UserGroupSeasonTopicProblem> {
    return this.seasonTopicUserProblemService.UserGroupSeasonTopicProblem(UserGroupSeasonTopicProblemId)
  }

  @Query(() => PaginationUserGroupSeasonTopicProblem)
  async UserGroupSeasonTopicProblems(
    @Args('filterUserGroupSeasonTopicProblemInput')
    filterUserGroupSeasonTopicProblemInput: FilterUserGroupSeasonTopicProblemInput,
    @Args('pageInfoInput', { nullable: true }) pageInfoInput?: PaginationInput,
  ): Promise<PaginationUserGroupSeasonTopicProblem> {
    return this.seasonTopicUserProblemService.UserGroupSeasonTopicProblems(
      filterUserGroupSeasonTopicProblemInput,
      pageInfoInput,
    )
  }

  @Mutation(() => UserGroupSeasonTopicProblem)
  async updateUserGroupSeasonTopicProblem(
    @Args('updateUserGroupSeasonTopicProblemInput')
    updateUserGroupSeasonTopicProblemInput: UpdateUserGroupSeasonTopicProblemInput,
  ): Promise<UserGroupSeasonTopicProblem> {
    return this.seasonTopicUserProblemService.updateUserGroupSeasonTopicProblem(
      updateUserGroupSeasonTopicProblemInput,
    )
  }

  @Mutation(() => Int)
  async removeUserGroupSeasonTopicProblem(
    @Args('seasonTopicProblemUserId') seasonTopicProblemUserId: UserGroupSeasonTopicProblemId,
  ) {
    return this.seasonTopicUserProblemService.removeUserGroupSeasonTopicProblem(
      seasonTopicProblemUserId,
    )
  }
}
