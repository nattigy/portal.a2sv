import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Roles } from 'src/auth/auth.decorator'
import { CreateTopicInput } from './dto/create-topic.input'
import { UpdateTopicInput } from './dto/update-topic.input'
import { Topic } from './entities/topic.entity'
import { TopicService } from './topic.service'

@Resolver()
export class TopicResolver {
  constructor(private readonly topicService: TopicService) {}

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION')
  @Mutation(() => Topic)
  createTopic(@Args('createTopicInput') createTopicInput: CreateTopicInput) {
    return this.topicService.createTopic(createTopicInput)
  }

  @Query(() => [Topic])
  topics() {
    return this.topicService.getTopics()
  }

  @Query(() => Topic)
  topic(@Args('id', { type: () => Int }) id: number) {
    return this.topicService.getTopicById(id)
  }
  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION')
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
}
