import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateSeasonTopicInput, SeasonTopicId } from './dto/create-season-topic.input'
import { UpdateSeasonTopicInput } from './dto/update-season-topic.input'
import { SeasonTopic } from './entities/season-topic.entity'
import { SeasonTopicService } from './season-topic.service'
import { FilterSeasonTopicInput } from './dto/filter-season-topic.input'
import { PaginationInput } from '../common/page/pagination.input'
import { PaginationSeasonTopic } from '../common/page/pagination-info'
import descriptions from './season-topic.doc'

@Resolver(() => SeasonTopic)
export class SeasonTopicResolver {
  constructor(private readonly seasonTopicService: SeasonTopicService) {
  }

  @Mutation(() => SeasonTopic, { description: descriptions.createSeasonTopic })
  async addTopicToASeason(
    @Args('createSeasonTopicInput')
      createSeasonTopicInput: CreateSeasonTopicInput,
  ): Promise<SeasonTopic> {
    return this.seasonTopicService.addTopicToASeason(createSeasonTopicInput)
  }

  @Query(() => SeasonTopic, { description: descriptions.seasonTopic })
  async seasonTopic(
    @Args('seasonTopicId') seasonTopicId: SeasonTopicId,
  ): Promise<SeasonTopic> {
    return this.seasonTopicService.seasonTopic(seasonTopicId)
  }

  @Query(() => PaginationSeasonTopic, { description: descriptions.seasonTopics })
  async seasonsTopics(
    @Args('filterSeasonTopicInput', { nullable: true })
      filterSeasonTopicInput: FilterSeasonTopicInput,
    @Args('pageInfoInput', { nullable: true }) pageInfoInput?: PaginationInput,
  ): Promise<PaginationSeasonTopic> {
    return this.seasonTopicService.seasonsTopics(filterSeasonTopicInput, pageInfoInput)
  }

  @Mutation(() => SeasonTopic, { description: descriptions.updateSeasonTopic })
  async addOrRemoveProblemsToSeasonTopic(
    @Args('updateSeasonTopicInput') updateSeasonTopicInput: UpdateSeasonTopicInput,
  ): Promise<SeasonTopic> {
    return this.seasonTopicService.update(updateSeasonTopicInput)
  }

  @Mutation(() => Int, { description: descriptions.removeSeasonTopic })
  async removeSeasonTopic(@Args('seasonTopicId') seasonTopicId: SeasonTopicId) {
    return this.seasonTopicService.removeSeasonTopic(seasonTopicId)
  }
}
