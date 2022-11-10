import { UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Roles } from 'src/auth/auth.decorator'
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.service'
import { TopicAbilities } from '../casl/handler/topic-abilities.handler'
import { CheckPolicies } from '../casl/policy/policy.decorator'
import { PoliciesGuard } from '../casl/policy/policy.guard'
import { PaginationOutput } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { SeasonTopic } from '../season-topic/entities/season-topic.entity'
import { UserTopic } from '../user-topic/entities/user-topic.entity'
import { AddTopicToSeasonInput } from './dto/add-topic-to-season-input'
import { CreateTopicInput } from './dto/create-topic.input'
import { GetTopicArgs } from './dto/get-topic.args'
import { UpdateTopicInput } from './dto/update-topic.input'
import { TopicActionStatus } from './entities/topic-action-status'
import { Topic } from './entities/topic.entity'
import { TopicService } from './topic.service'

@Resolver(() => Topic)
export class TopicResolver {
  constructor(private readonly topicService: TopicService) {}

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(TopicAbilities.create)
  @Mutation(() => Topic)
  createTopic(@Args('createTopicInput') createTopicInput: CreateTopicInput) {
    return this.topicService.createTopic(createTopicInput)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(TopicAbilities.read)
  @Query(() => PaginationOutput<Topic>, { name: 'topics' })
  topics(
    @Args() args: GetTopicArgs,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput?: PaginationInfoInput,
  ) {
    return this.topicService.getTopics(args, pageInfoInput)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(TopicAbilities.read)
  @Query(() => Topic)
  topic(@Args('id', { type: () => String }) id: string) {
    return this.topicService.getTopicById(id)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(TopicAbilities.update)
  @Mutation(() => Topic)
  updateTopic(
    @Args('id', { type: () => String }) id: string,
    @Args('updateTopicInput') updateTopicInput: UpdateTopicInput,
  ) {
    return this.topicService.updateTopic(id, updateTopicInput)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(TopicAbilities.delete)
  @Mutation(() => Topic)
  deleteTopic(@Args('id', { type: () => String }) id: string) {
    return this.topicService.deleteTopic(id)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(TopicAbilities.read)
  @ResolveField(() => [SeasonTopic], { nullable: 'itemsAndList' })
  seasons(@Parent() topic: Topic): SeasonTopic[] {
    return topic.seasons
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(TopicAbilities.update)
  @Mutation(() => TopicActionStatus)
  async addTopicToGroup(
    @Args('addTopicToGroupInput', { type: () => AddTopicToSeasonInput })
    addTopicToGroupInput: AddTopicToSeasonInput,
  ): Promise<TopicActionStatus> {
    try {
      await this.topicService.addTopicToSeason(addTopicToGroupInput)
      return TopicActionStatus.SUCCESS
    } catch (e) {
      return TopicActionStatus.FAILED
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(TopicAbilities.read)
  @ResolveField(() => [UserTopic])
  users(@Parent() topic: Topic): UserTopic[] {
    return topic.users
  }
}
