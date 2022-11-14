import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Topic } from '../topic/entities/topic.entity'
import { User } from '../user/entities/user.entity'
import { CreateUserTopicInput } from './dto/create-user-topic.input'
import { UpdateUserTopicInput } from './dto/update-user-topic.input'
import { UserTopic } from './entities/user-topic.entity'
import { UserTopicService } from './user-topic.service'
import { PaginationUserTopic } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { FilterUserTopicInput } from './dto/filter-user-topic-input'

@Resolver(() => UserTopic)
export class UserTopicResolver {
  constructor(private readonly userTopicService: UserTopicService) {}

  @Mutation(() => UserTopic)
  async createUserTopic(
    @Args('createUserTopicInput') createUserTopicInput: CreateUserTopicInput,
  ) {
    return this.userTopicService.create(createUserTopicInput)
  }

  @Query(() => PaginationUserTopic)
  async userTopics(
    @Args('filterUserTopicInput', { type: () => FilterUserTopicInput, nullable: true })
    filterUserTopicInput?: FilterUserTopicInput,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput?: PaginationInfoInput,
  ) {
    return this.userTopicService.findAll(filterUserTopicInput, pageInfoInput)
  }

  @Query(() => UserTopic)
  async userTopic(@Args('userId') userId: string, @Args('topicId') topicId: string) {
    return this.userTopicService.findOne(userId, topicId)
  }

  @Mutation(() => UserTopic)
  async updateUserTopic(
    @Args('updateUserTopicInput') updateUserTopicInput: UpdateUserTopicInput,
  ) {
    return this.userTopicService.update(updateUserTopicInput)
  }

  @Mutation(() => UserTopic)
  async removeUserTopic(@Args('id', { type: () => String }) id: string) {
    return this.userTopicService.remove(id)
  }

  @ResolveField(() => User)
  user(@Parent() userTopic: UserTopic) {
    return userTopic.user
  }

  @ResolveField(() => Topic)
  topic(@Parent() userTopic: UserTopic) {
    return userTopic.topic
  }
}
