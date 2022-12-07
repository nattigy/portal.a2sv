import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { SeasonTopicProblemUserId } from './dto/season-topic-problem-user.id'
import { UpdateSeasonTopicProblemUserInput } from './dto/update-season-topic-problem-user.input'
import { UserSeasonTopicProblem } from './entities/user-season-topic-problem.entity'
import { UserSeasonTopicProblemService } from './user-season-topic-problem.service'
import { PaginationInput } from '../../common/page/pagination.input'
import { PaginationSeasonTopicProblemUser } from '../../common/page/pagination-info'

@Resolver(() => UserSeasonTopicProblem)
export class UserSeasonTopicProblemResolver {
  constructor(private readonly seasonTopicUserProblemService: UserSeasonTopicProblemService) {}

  // @Mutation(() => SeasonTopicProblemUser)
  // async createSeasonTopicProblemUser(
  //   @Args('createSeasonTopicProblemUserInput')
  //   createSeasonTopicProblemUserInput: CreateSeasonTopicProblemUserInput,
  // ): Promise<SeasonTopicProblemUser> {
  //   return this.seasonTopicUserProblemService.create(createSeasonTopicProblemUserInput)
  // }

  // @Query(() => SeasonTopicUserProblem)
  // async seasonTopicUserProblem(
  //   @Args('id', { type: () => SeasonTopicProblemUserId })
  //     id: SeasonTopicProblemUserId,
  // ): Promise<SeasonTopicUserProblem> {
  //   return this.seasonTopicUserProblemService.findOne(id)
  // }

  @Query(() => UserSeasonTopicProblem)
  async seasonTopicUserProblem(
    @Args('seasonTopicProblemUserId') seasonTopicProblemUserId: SeasonTopicProblemUserId,
  ): Promise<UserSeasonTopicProblem> {
    return this.seasonTopicUserProblemService.findOne(seasonTopicProblemUserId)
  }

  @Query(() => PaginationSeasonTopicProblemUser)
  async seasonTopicUserProblems(
    @Args('seasonId') seasonId: string,
    @Args('userId') userId: string,
    @Args('topicId') topicId: string,
    @Args('paginationInfoInput', { nullable: true })
    pageInfoInput?: PaginationInput,
  ): Promise<PaginationSeasonTopicProblemUser> {
    return this.seasonTopicUserProblemService.seasonTopicUserProblems(
      seasonId,
      userId,
      topicId,
      pageInfoInput,
    )
  }

  @Query(() => PaginationSeasonTopicProblemUser)
  async seasonTopicUsersProblem(
    @Args('seasonId') seasonId: string,
    @Args('topicId') topicId: string,
    @Args('groupId') groupId: string,
    @Args('paginationInfoInput', { nullable: true })
    pageInfoInput?: PaginationInput,
  ): Promise<PaginationSeasonTopicProblemUser> {
    return this.seasonTopicUserProblemService.seasonTopicUsersProblem(
      seasonId,
      topicId,
      groupId,
      pageInfoInput,
    )
  }

  @Mutation(() => UserSeasonTopicProblem)
  async updateSeasonTopicProblemUser(
    @Args('updateSeasonTopicProblemUserInput')
    updateSeasonTopicProblemUserInput: UpdateSeasonTopicProblemUserInput,
  ): Promise<UserSeasonTopicProblem> {
    return this.seasonTopicUserProblemService.update(updateSeasonTopicProblemUserInput)
  }

  @Mutation(() => Int)
  async removeSeasonTopicProblemUser(
    @Args('seasonTopicProblemUserId') seasonTopicProblemUserId: SeasonTopicProblemUserId,
  ) {
    return this.seasonTopicUserProblemService.remove(seasonTopicProblemUserId)
  }
}
