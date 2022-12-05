import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateSeasonTopicProblemInput, SeasonTopicProblemId } from './dto/create-season-topic-problem.input'
import { SeasonTopicProblem } from './entities/season-topic-problem.entity'
import { SeasonTopicProblemService } from './season-topic-problem.service'
import { PaginationInput } from '../common/page/pagination.input'
import { PaginationSeasonTopicProblem } from '../common/page/pagination-info'
import descriptions from './season-topic-problem.doc'
import { SeasonTopicId } from '../season-topic/dto/create-season-topic.input'

@Resolver(() => SeasonTopicProblem)
export class SeasonTopicProblemResolver {
  constructor(private readonly seasonTopicProblemService: SeasonTopicProblemService) {
  }

  @Mutation(() => SeasonTopicProblem, {
    description: descriptions.createSeasonTopicProblem,
  })
  async addProblemToSeasonTopic(
    @Args('createSeasonTopicProblemInput') createSeasonTopicProblemInput: CreateSeasonTopicProblemInput,
  ): Promise<SeasonTopicProblem> {
    return this.seasonTopicProblemService.addProblemToSeasonTopic(createSeasonTopicProblemInput)
  }

  @Query(() => SeasonTopicProblem, { description: descriptions.seasonTopicProblem })
  async seasonTopicProblem(
    @Args('seasonTopicProblemId') seasonTopicProblemId: SeasonTopicProblemId,
  ): Promise<SeasonTopicProblem> {
    return this.seasonTopicProblemService.seasonTopicProblem(seasonTopicProblemId)
  }

  @Query(() => PaginationSeasonTopicProblem, { description: descriptions.seasonTopicProblems })
  async seasonTopicProblems(
    @Args('seasonTopicId') seasonTopicId: SeasonTopicId,
    @Args('pageInfoInput', { nullable: true })
      pageInfoInput?: PaginationInput,
  ): Promise<PaginationSeasonTopicProblem> {
    return this.seasonTopicProblemService.seasonTopicProblems(seasonTopicId, pageInfoInput)
  }

  @Mutation(() => SeasonTopicProblem, { description: descriptions.removeSeasonTopicProblem })
  async removeSeasonTopicProblem(
    @Args('seasonTopicProblemId') seasonTopicProblemId: SeasonTopicProblemId,
  ) {
    return this.seasonTopicProblemService.remove(seasonTopicProblemId)
  }

  @Mutation(() => Int, { description: descriptions.removeSeasonTopicProblem })
  async removeSeasonTopicProblems(
    @Args('seasonTopicId') { seasonId, topicId }: SeasonTopicId,
    @Args('problemIds') problemIds: string[],
  ): Promise<number> {
    for (const problemId of problemIds) {
      await this.seasonTopicProblemService.remove({
        seasonId, topicId, problemId,
      })
    }
    return problemIds.length
  }
}
