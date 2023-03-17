import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PaginationTopic } from '../../common/page/pagination-info'
import { PaginationInput } from '../../common/page/pagination.input'
import { CreateTopicInput } from './dto/create-topic.input'
import { UpdateTopicInput } from './dto/update-topic.input'
import { Topic } from './entities/topic.entity'
import { TopicService } from './topic.service'
import { FilterTopicInput } from './dto/filter-topic-input'
import descriptions from './topic.doc'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.service'
import { PoliciesGuard } from '../../casl/policy/policy.guard'
import { CheckPolicies } from '../../casl/policy/policy.decorator'
import { ProblemAbilities } from '../../casl/handler/problem-abilities.handler'
import { TopicAbilities } from '../../casl/handler/topic-abilities.handler'
import { BadRequestException } from '@nestjs/common/exceptions'

@Resolver(() => Topic)
export class TopicResolver {
  constructor(private readonly topicService: TopicService) {}

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(ProblemAbilities.create)
  @Mutation(() => Topic, { description: descriptions.createTopic })
  async createTopic(
    @Args('createTopicInput') createTopicInput: CreateTopicInput,
  ): Promise<Topic> {
    try {
      return this.topicService.create(createTopicInput)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Error creating Topic!')
    }
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
    try {
      return this.topicService.topics(filterTopicInput, pageInfoInput)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Error loading Topics')
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(TopicAbilities.read)
  @Query(() => Topic, { description: descriptions.topic })
  async topic(@Args('topicId') topicId: string): Promise<Topic> {
    try {
      return this.topicService.topic(topicId)
    } catch (e) {
      console.log('Error: ', e)
      throw new BadRequestException('Error loading a topic!')
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(TopicAbilities.update)
  @Mutation(() => Topic, { description: descriptions.updateTopic })
  async updateTopic(
    @Args('updateTopicInput') updateTopicInput: UpdateTopicInput,
  ): Promise<Topic> {
    try {
      return this.topicService.updateTopic(updateTopicInput)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Error updating topic')
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(TopicAbilities.delete)
  @Mutation(() => Int, { description: descriptions.deleteTopic })
  async removeTopic(@Args('topicId') topicId: string) {
    try {
      return this.topicService.removeTopic(topicId)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Error removing topic!')
    }
  }
}
