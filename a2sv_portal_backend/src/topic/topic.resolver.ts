import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
// import { Group } from '@prisma/client'
import { Group } from '../groups/entities/group.entity'
import { Roles } from 'src/auth/auth.decorator'
import { GroupTopic } from 'src/group-topic/entities/group-topic.entity'
import { Season } from 'src/season/entities/season.entity'
import { CreateTopicInput } from './dto/create-topic.input'
import { GetTopicArgs } from './dto/get-topic.args'
import { UpdateTopicInput } from './dto/update-topic.input'
import { Topic } from './entities/topic.entity'
import { TopicService } from './topic.service'

@Resolver(() => Topic)
export class TopicResolver {
  constructor(private readonly topicService: TopicService) {}

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION')
  @Mutation(() => Topic)
  createTopic(@Args('createTopicInput') createTopicInput: CreateTopicInput) {
    return this.topicService.createTopic(createTopicInput)
  }

  @Query(() => [Topic], { name: 'topics' })
  topics(@Args() args: GetTopicArgs) {
    return this.topicService.getTopics(args)
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

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION')
  @ResolveField(() => Season)
  season(@Parent() topic: Topic): Season {
    return topic.season
  }

  @ResolveField(() => [GroupTopic], { nullable: 'itemsAndList' })
  groups(@Parent() topic: Topic): GroupTopic[] | null {
    return topic.groups
  }
}
