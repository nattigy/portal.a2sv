import { Args, Int, Mutation, Resolver } from '@nestjs/graphql'
import { UserGroupSeasonTopicProblem } from './entities/user-group-season-topic-problem.entity'
import { UserGroupSeasonTopicProblemService } from './user-group-season-topic-problem.service'
import { UserGroupSeasonTopicProblemId } from './dto/create-user-group-season-topic-problem.input'

@Resolver(() => UserGroupSeasonTopicProblem)
export class UserGroupSeasonTopicProblemResolver {
  constructor(
    private readonly seasonTopicUserProblemService: UserGroupSeasonTopicProblemService,
  ) {}

  // @Query(() => UserGroupSeasonTopicProblem)
  // async userGroupSeasonTopicProblem(
  //   @Args('UserGroupSeasonTopicProblemId') UserGroupSeasonTopicProblemId: UserGroupSeasonTopicProblemId,
  // ): Promise<UserGroupSeasonTopicProblem> {
  //   return this.seasonTopicUserProblemService.userGroupSeasonTopicProblem(UserGroupSeasonTopicProblemId)
  // }
  //
  // @Query(() => PaginationUserGroupSeasonTopicProblem)
  // async userGroupSeasonTopicProblems(
  //   @Args('filterUserGroupSeasonTopicProblemInput')
  //   filterUserGroupSeasonTopicProblemInput: FilterUserGroupSeasonTopicProblemInput,
  //   @Args('pageInfoInput', { nullable: true }) pageInfoInput?: PaginationInput,
  // ): Promise<PaginationUserGroupSeasonTopicProblem> {
  //   return this.seasonTopicUserProblemService.userGroupSeasonTopicProblems(
  //     filterUserGroupSeasonTopicProblemInput,
  //     pageInfoInput,
  //   )
  // }
  //
  // @Mutation(() => UserGroupSeasonTopicProblem)
  // async updateUserGroupSeasonTopicProblem(
  //   @Args('updateUserGroupSeasonTopicProblemInput')
  //   updateUserGroupSeasonTopicProblemInput: UpdateUserGroupSeasonTopicProblemInput,
  // ): Promise<UserGroupSeasonTopicProblem> {
  //   return this.seasonTopicUserProblemService.updateUserGroupSeasonTopicProblem(
  //     updateUserGroupSeasonTopicProblemInput,
  //   )
  // }

  @Mutation(() => Int)
  async removeUserGroupSeasonTopicProblem(
    @Args('seasonTopicProblemUserId') seasonTopicProblemUserId: UserGroupSeasonTopicProblemId,
  ) {
    return this.seasonTopicUserProblemService.removeUserGroupSeasonTopicProblem(
      seasonTopicProblemUserId,
    )
  }
}
