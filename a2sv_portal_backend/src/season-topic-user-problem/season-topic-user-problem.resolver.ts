import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { SeasonTopicProblemUserId } from './dto/season-topic-problem-user.id'
import { UpdateSeasonTopicProblemUserInput } from './dto/update-season-topic-problem-user.input'
import { SeasonTopicUserProblem } from './entities/season-topic-user-problem.entity'
import { SeasonTopicUserProblemService } from './season-topic-user-problem.service'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { PaginationSeasonTopicProblemUser } from '../common/page/pagination-info'

@Resolver(() => SeasonTopicUserProblem)
export class SeasonTopicUserProblemResolver {
  constructor(private readonly seasonTopicUserProblemService: SeasonTopicUserProblemService) {
  }

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

  @Query(() => SeasonTopicUserProblem)
  async seasonTopicUserProblem(
    @Args('seasonTopicProblemUserId') seasonTopicProblemUserId: SeasonTopicProblemUserId,
  ): Promise<SeasonTopicUserProblem> {
    return this.seasonTopicUserProblemService.findOne(seasonTopicProblemUserId)
  }

  @Query(() => PaginationSeasonTopicProblemUser)
  async seasonTopicUserProblems(
    @Args('seasonId') seasonId: string,
    @Args('userId') userId: string,
    @Args('topicId') topicId: string,
    @Args('paginationInfoInput', { nullable: true })
      pageInfoInput?: PaginationInfoInput,
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
      pageInfoInput?: PaginationInfoInput,
  ): Promise<PaginationSeasonTopicProblemUser> {
    return this.seasonTopicUserProblemService.seasonTopicUsersProblem(
      seasonId,
      topicId,
      groupId,
      pageInfoInput,
    )
  }

  @Mutation(() => SeasonTopicUserProblem)
  async updateSeasonTopicProblemUser(
    @Args('updateSeasonTopicProblemUserInput')
      updateSeasonTopicProblemUserInput: UpdateSeasonTopicProblemUserInput,
  ): Promise<SeasonTopicUserProblem> {
    return this.seasonTopicUserProblemService.update(updateSeasonTopicProblemUserInput)
  }

  @Mutation(() => SeasonTopicUserProblem)
  async removeSeasonTopicProblemUser(
    @Args('id', { type: () => SeasonTopicProblemUserId })
      id: SeasonTopicProblemUserId,
  ) {
    return this.seasonTopicUserProblemService.remove(id)
  }
}
