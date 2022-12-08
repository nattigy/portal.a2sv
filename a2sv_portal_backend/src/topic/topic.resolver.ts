import { UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.service'
import { TopicAbilities } from '../casl/handler/topic-abilities.handler'
import { CheckPolicies } from '../casl/policy/policy.decorator'
import { PoliciesGuard } from '../casl/policy/policy.guard'
import { PaginationTopic } from '../common/page/pagination-info'
import { PaginationInput } from '../common/page/pagination.input'
import { CreateTopicInput } from './dto/create-topic.input'
import { UpdateTopicInput } from './dto/update-topic.input'
import { Topic } from './entities/topic.entity'
import { TopicService } from './topic.service'
import { FilterTopicInput } from './dto/filter-topic-input'
import descriptions from './topic.doc'

@Resolver(() => Topic)
export class TopicResolver {
  constructor(private readonly topicService: TopicService) {
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(TopicAbilities.create)
  @Mutation(() => Topic, { description: descriptions.createTopic })
  async createTopic(
    @Args('createTopicInput') createTopicInput: CreateTopicInput,
  ): Promise<Topic> {
    return this.topicService.create(createTopicInput)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(TopicAbilities.read)
  @Query(() => PaginationTopic, { description: descriptions.topics })
  async topics(
    @Args('filterTopicInput', { type: () => FilterTopicInput, nullable: true })
      filterTopicInput?: FilterTopicInput,
    @Args('pageInfoInput', { type: () => PaginationInput, nullable: true })
      pageInfoInput?: PaginationInput,
  ): Promise<PaginationTopic> {
    return this.topicService.topics(filterTopicInput, pageInfoInput)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(TopicAbilities.read)
  @Query(() => Topic, { description: descriptions.topic })
  async topic(@Args('topicId') topicId: string): Promise<Topic> {
    return this.topicService.topic(topicId)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(TopicAbilities.update)
  @Mutation(() => Topic, { description: descriptions.updateTopic })
  async updateTopic(
    @Args('topicId') topicId: string,
    @Args('updateTopicInput') updateTopicInput: UpdateTopicInput,
  ): Promise<Topic> {
    return this.topicService.update(topicId, updateTopicInput)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(TopicAbilities.delete)
  @Mutation(() => Int, { description: descriptions.deleteTopic })
  async removeTopic(@Args('topicId') topicId: string) {
    return this.topicService.remove(topicId)
  }
}
