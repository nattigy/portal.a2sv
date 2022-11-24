import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateSeasonTopicProblemInput } from './dto/create-season-topic-problem.input'
import { UpdateSeasonTopicProblemInput } from './dto/update-season-topic-problem.input'
import { SeasonTopicProblem } from './entities/season-topic-problem.entity'
import { SeasonTopicProblemService } from './season-topic-problem.service'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { SeasonTopicProblemId } from '../season-topic/dto/filter-season-topic.input'
import { PaginationSeasonTopicProblem } from '../common/page/pagination-info'
import descriptions from './season-topic-problem.doc'
import { SeasonTopicProblemFilter } from './dto/filter-season-topic-problem'

@Resolver(() => SeasonTopicProblem)
export class SeasonTopicProblemResolver {
  constructor(private readonly seasonTopicProblemService: SeasonTopicProblemService) {}

  @Mutation(() => SeasonTopicProblem, {
    description: descriptions.createSeasonTopicProblem,
  })
  async createSeasonTopicProblem(
    @Args('createSeasonTopicProblemInput')
    createSeasonTopicProblemInput: CreateSeasonTopicProblemInput,
  ) {
    return this.seasonTopicProblemService.create(createSeasonTopicProblemInput)
  }

  @Query(() => PaginationSeasonTopicProblem, { description: descriptions.seasonTopicProblems })
  async seasonTopicProblems(
    @Args('seasonTopicProblemFilter', { type: () => SeasonTopicProblemFilter, nullable: true })
    seasonTopicProblemFilter: SeasonTopicProblemFilter,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput?: PaginationInfoInput,
  ): Promise<PaginationSeasonTopicProblem> {
    return this.seasonTopicProblemService.findAll(seasonTopicProblemFilter, pageInfoInput)
  }

  @Query(() => SeasonTopicProblem, {
    description: descriptions.seasonTopicProblem,
  })
  async seasonTopicProblem(
    @Args('seasonTopicProblemId') seasonTopicProblemId: SeasonTopicProblemId,
  ) {
    return this.seasonTopicProblemService.findOne(seasonTopicProblemId)
  }

  @Mutation(() => SeasonTopicProblem, {
    description: descriptions.updateSeasonTopicProblem,
  })
  async updateSeasonTopicProblem(
    @Args('updateSeasonTopicProblemInput')
    updateSeasonTopicProblemInput: UpdateSeasonTopicProblemInput,
  ) {
    return this.seasonTopicProblemService.update(updateSeasonTopicProblemInput)
  }

  @Mutation(() => Int, { description: descriptions.removeSeasonTopicProblem })
  async removeSeasonTopicProblem(
    @Args('seasonTopicProblemId') seasonTopicProblemId: SeasonTopicProblemId,
  ) {
    return this.seasonTopicProblemService.remove(seasonTopicProblemId)
  }
}
