import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateSeasonTopicProblemInput } from './dto/create-season-topic-problem.input'
import { UpdateSeasonTopicProblemInput } from './dto/update-season-topic-problem.input'
import { SeasonTopicProblem } from './entities/season-topic-problem.entity'
import {
  SeasonTopicProblemFilter,
  SeasonTopicProblemService,
} from './season-topic-problem.service'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { SeasonTopicProblemId } from '../season-topic/dto/filter-season-topic.input'
import { PaginationOutput } from '../common/page/pagination-info'

@Resolver(() => SeasonTopicProblem)
export class SeasonTopicProblemResolver {
  constructor(private readonly seasonTopicProblemService: SeasonTopicProblemService) {}

  @Mutation(() => SeasonTopicProblem)
  async createSeasonTopicProblem(
    @Args('createSeasonTopicProblemInput')
    createSeasonTopicProblemInput: CreateSeasonTopicProblemInput,
  ) {
    return this.seasonTopicProblemService.create(createSeasonTopicProblemInput)
  }

  @Query(() => PaginationOutput<SeasonTopicProblem>)
  async seasonTopicProblems(
    @Args('seasonTopicProblemFilter', { type: () => SeasonTopicProblemFilter })
    seasonTopicProblemFilter: SeasonTopicProblemFilter,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput?: PaginationInfoInput,
  ): Promise<PaginationOutput<SeasonTopicProblem>> {
    return this.seasonTopicProblemService.findAll(seasonTopicProblemFilter, pageInfoInput)
  }

  @Query(() => SeasonTopicProblem)
  async seasonTopicProblem(
    @Args('seasonTopicProblemId', { type: () => SeasonTopicProblemId })
    id: SeasonTopicProblemId,
  ) {
    return this.seasonTopicProblemService.findOne(id)
  }

  @Mutation(() => SeasonTopicProblem)
  async updateSeasonTopicProblem(
    @Args('updateSeasonTopicProblemInput')
    updateSeasonTopicProblemInput: UpdateSeasonTopicProblemInput,
  ) {
    return this.seasonTopicProblemService.update(updateSeasonTopicProblemInput)
  }

  @Mutation(() => SeasonTopicProblem)
  async removeSeasonTopicProblem(
    @Args('seasonTopicProblemId', { type: () => Int }) id: SeasonTopicProblemId,
  ) {
    return this.seasonTopicProblemService.remove(id)
  }
}
