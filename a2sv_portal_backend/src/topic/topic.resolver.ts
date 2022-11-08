import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Roles } from 'src/auth/auth.decorator'
import { CreateTopicInput } from './dto/create-topic.input'
import { GetTopicArgs } from './dto/get-topic.args'
import { UpdateTopicInput } from './dto/update-topic.input'
import { Topic } from './entities/topic.entity'
import { TopicService } from './topic.service'
import { AddTopicToSeasonInput } from './dto/add-topic-to-season-input'
import { TopicActionStatus } from './entities/topic-action-status'
import { UserTopic } from '../user-topic/entities/user-topic.entity'
import { SeasonTopic } from '../season-topic/entities/season-topic.entity'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import {
  PaginationOutput,
  PaginationTopic,
} from '../common/page/pagination-info'

@Resolver(() => Topic)
export class TopicResolver {
  constructor(private readonly topicService: TopicService) {}

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION')
  @Mutation(() => Topic)
  createTopic(@Args('createTopicInput') createTopicInput: CreateTopicInput) {
    return this.topicService.createTopic(createTopicInput)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Query(() => PaginationOutput<Topic>, { name: 'topics' })
  topics(
    @Args() args: GetTopicArgs,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput?: PaginationInfoInput,
  ) {
    return this.topicService.getTopics(args, pageInfoInput)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Query(() => Topic)
  topic(@Args('id', { type: () => String }) id: string) {
    return this.topicService.getTopicById(id)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Mutation(() => Topic)
  updateTopic(
    @Args('id', { type: () => String }) id: string,
    @Args('updateTopicInput') updateTopicInput: UpdateTopicInput,
  ) {
    return this.topicService.updateTopic(id, updateTopicInput)
  }

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION')
  @Mutation(() => Topic)
  deleteTopic(@Args('id', { type: () => String }) id: string) {
    return this.topicService.deleteTopic(id)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @ResolveField(() => [SeasonTopic], { nullable: 'itemsAndList' })
  seasons(@Parent() topic: Topic): SeasonTopic[] {
    return topic.seasons
  }

  @Mutation(() => TopicActionStatus)
  async addTopicToGroup(
    @Args('addTopicToGroupInput', { type: () => AddTopicToSeasonInput })
    addTopicToGroupInput: AddTopicToSeasonInput,
  ): Promise<TopicActionStatus> {
    try {
      await this.topicService.addTopicToSeason(addTopicToGroupInput)
      return TopicActionStatus.SUCCESS
    } catch (e) {
      console.error(e)
      return TopicActionStatus.FAILED
    }
  }

  @ResolveField(() => [UserTopic])
  users(@Parent() topic: Topic): UserTopic[] {
    return topic.users
  }
}
