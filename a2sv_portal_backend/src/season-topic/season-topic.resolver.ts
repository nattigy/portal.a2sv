import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import {
  SeasonTopicFilter,
  SeasonTopicId,
  SeasonTopicService,
} from './season-topic.service'
import { SeasonTopic } from './entities/season-topic.entity'
import { CreateSeasonTopicInput } from './dto/create-season-topic.input'
import { UpdateSeasonTopicInput } from './dto/update-season-topic.input'
import { Topic } from '../topic/entities/topic.entity'
import { Season } from '../season/entities/season.entity'
import { SeasonTopicProblem } from '../season-topic-problem/entities/season-topic-problem.entity'

@Resolver(() => SeasonTopic)
export class SeasonTopicResolver {
  constructor(private readonly seasonTopicService: SeasonTopicService) {}

  @Mutation(() => SeasonTopic)
  createSeasonTopic(
    @Args('createSeasonTopicInput')
    createSeasonTopicInput: CreateSeasonTopicInput,
  ) {
    return this.seasonTopicService.create(createSeasonTopicInput)
  }

  @Query(() => [SeasonTopic], { name: 'seasonTopics' })
  seasonTopics(
    @Args('seasonTopicFilter', { type: () => SeasonTopicFilter })
    seasonTopicFilter: SeasonTopicFilter,
  ) {
    return this.seasonTopicService.findAll(seasonTopicFilter)
  }

  @Query(() => SeasonTopic, { name: 'seasonTopic' })
  seasonTopic(
    @Args('seasonTopicId', { type: () => SeasonTopicId }) id: SeasonTopicId,
  ) {
    return this.seasonTopicService.findOne(id)
  }

  @Mutation(() => SeasonTopic)
  updateSeasonTopic(
    @Args('updateSeasonTopicInput')
    updateSeasonTopicInput: UpdateSeasonTopicInput,
  ) {
    return this.seasonTopicService.update(updateSeasonTopicInput)
  }

  @Mutation(() => SeasonTopic)
  removeSeasonTopic(
    @Args('seasonTopicId', { type: () => Int }) id: SeasonTopicId,
  ) {
    return this.seasonTopicService.remove(id)
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
}
