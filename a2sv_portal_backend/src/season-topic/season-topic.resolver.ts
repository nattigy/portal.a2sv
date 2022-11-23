import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { SeasonTopicProblem } from '../season-topic-problem/entities/season-topic-problem.entity'
import { Season } from '../season/entities/season.entity'
import { Topic } from '../topic/entities/topic.entity'
import { CreateSeasonTopicInput } from './dto/create-season-topic.input'
import { SeasonTopicId, UpdateSeasonTopicInput } from './dto/update-season-topic.input'
import { SeasonTopic } from './entities/season-topic.entity'
import { SeasonTopicService } from './season-topic.service'
import { FilterSeasonTopicInput } from './dto/filter-season-topic.input'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { PaginationSeasonTopic } from '../common/page/pagination-info'
import descriptions from './season-topic.doc'

@Resolver(() => SeasonTopic)
export class SeasonTopicResolver {
  constructor(private readonly seasonTopicService: SeasonTopicService) {}

  @Mutation(() => SeasonTopic, { description: descriptions.createSeasonTopic })
  async createSeasonTopic(
    @Args('createSeasonTopicInput')
    createSeasonTopicInput: CreateSeasonTopicInput,
  ): Promise<SeasonTopic> {
    return this.seasonTopicService.create(createSeasonTopicInput)
  }

  @Query(() => PaginationSeasonTopic, { description: descriptions.seasonTopics })
  async seasonTopics(
    @Args('filterSeasonTopicInput', { type: () => FilterSeasonTopicInput })
    filterSeasonTopicInput: FilterSeasonTopicInput,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput?: PaginationInfoInput,
  ): Promise<PaginationSeasonTopic> {
    return this.seasonTopicService.findAll(filterSeasonTopicInput, pageInfoInput)
  }

  @Query(() => SeasonTopic, { description: descriptions.seasonTopic })
  async seasonTopic(
    @Args('seasonId') seasonId: string,
    @Args('topicId') topicId: string,
  ): Promise<SeasonTopic> {
    return this.seasonTopicService.findOne(seasonId, topicId)
  }

  @Mutation(() => SeasonTopic, { description: descriptions.updateSeasonTopic })
  async updateSeasonTopic(
    @Args('updateSeasonTopicInput')
    updateSeasonTopicInput: UpdateSeasonTopicInput,
  ): Promise<SeasonTopic> {
    return this.seasonTopicService.update(updateSeasonTopicInput)
  }

  @ResolveField(() => Topic)
  topic(@Parent() seasonTopic: SeasonTopic) {
    return seasonTopic.topic
  }

  @ResolveField(() => Season)
  season(@Parent() seasonTopic: SeasonTopic) {
    return seasonTopic.season
  }

  @ResolveField(() => [SeasonTopicProblem])
  problems(@Parent() seasonTopic: SeasonTopic) {
    return seasonTopic.problems
  }

  @Mutation(() => Int, { description: descriptions.removeSeasonTopic })
  async removeSeasonTopic(
    @Args('seasonTopicId') seasonTopicId: SeasonTopicId
  ) {
    return this.seasonTopicService.remove(seasonTopicId)
  }
}
