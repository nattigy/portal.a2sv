import { Args, Int, Mutation, Resolver } from '@nestjs/graphql'
import { UpdateUserSeasonTopicProblemInput } from './dto/update-user-season-topic-problem.input'
import { UserSeasonTopicProblem } from './entities/user-season-topic-problem.entity'
import { UserSeasonTopicProblemService } from './user-season-topic-problem.service'
import { UserSeasonTopicProblemId } from './dto/create-user-season-topic-problem.input'

@Resolver(() => UserSeasonTopicProblem)
export class UserSeasonTopicProblemResolver {
  constructor(private readonly seasonTopicUserProblemService: UserSeasonTopicProblemService) {
  }

  // @Query(() => UserSeasonTopicProblem)
  // async userSeasonTopicProblem(
  //   @Args('userSeasonTopicProblemId') userSeasonTopicProblemId: UserSeasonTopicProblemId,
  // ): Promise<UserSeasonTopicProblem> {
  //   return this.seasonTopicUserProblemService.userSeasonTopicProblem(userSeasonTopicProblemId)
  // }
  //
  // @Query(() => PaginationUserSeasonTopicProblem)
  // async userSeasonTopicProblems(
  //   @Args('filterUserSeasonTopicProblemInput')
  //   filterUserSeasonTopicProblemInput: FilterUserSeasonTopicProblemInput,
  //   @Args('pageInfoInput', { nullable: true }) pageInfoInput?: PaginationInput,
  // ): Promise<PaginationUserSeasonTopicProblem> {
  //   return this.seasonTopicUserProblemService.userSeasonTopicProblems(
  //     filterUserSeasonTopicProblemInput,
  //     pageInfoInput,
  //   )
  // }

  @Mutation(() => UserSeasonTopicProblem)
  async updateUserSeasonTopicProblem(
    @Args('updateUserSeasonTopicProblemInput')
      updateUserSeasonTopicProblemInput: UpdateUserSeasonTopicProblemInput,
  ): Promise<UserSeasonTopicProblem> {
    return this.seasonTopicUserProblemService.updateUserSeasonTopicProblem(
      updateUserSeasonTopicProblemInput,
    )
  }

  @Mutation(() => Int)
  async removeUserSeasonTopicProblem(
    @Args('seasonTopicProblemUserId') seasonTopicProblemUserId: UserSeasonTopicProblemId,
  ) {
    return this.seasonTopicUserProblemService.removeUserSeasonTopicProblem(
      seasonTopicProblemUserId,
    )
  }
}
