import {
  Args,
  Int,
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
import { GroupTopicSeason } from '../group-topic-season/entities/group-topic-season.entity'
import { AddTopicToGroupInput } from './dto/add-topic-to-group-input'
import { TopicActionStatus } from './entities/topic-action-status'
import { UserTopic } from '../user-topic/entities/user-topic.entity'

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
  @Query(() => [Topic], { name: 'topics' })
  topics(@Args() args: GetTopicArgs) {
    return this.topicService.getTopics(args)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Query(() => Topic)
  topic(@Args('id', { type: () => Int }) id: number) {
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
    @Args('id', { type: () => Int }) id: number,
    @Args('updateTopicInput') updateTopicInput: UpdateTopicInput,
  ) {
    return this.topicService.updateTopic(id, updateTopicInput)
  }

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION')
  @Mutation(() => Topic)
  deleteTopic(@Args('id', { type: () => Int }) id: number) {
    return this.topicService.deleteTopic(id)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @ResolveField(() => [GroupTopicSeason], { nullable: 'itemsAndList' })
  seasonGroups(@Parent() topic: Topic): GroupTopicSeason[] | null {
    return topic.seasonGroups
  }

  @Mutation(() => TopicActionStatus)
  async addTopicToGroup(
    @Args('addTopicToGroupInput', { type: () => AddTopicToGroupInput })
    addTopicToGroupInput: AddTopicToGroupInput,
  ): Promise<TopicActionStatus> {
    try {
      await this.topicService.addTopicToGroup(addTopicToGroupInput)
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
