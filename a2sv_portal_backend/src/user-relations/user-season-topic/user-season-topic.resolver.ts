import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Topic } from '../../topic/entities/topic.entity'
import { User } from '../../user/entities/user.entity'
import { CreateUserSeasonTopicInput } from './dto/create-user-season-topic.input'
import { UpdateUserSeasonTopicInput, UserTopicId } from './dto/update-user-season-topic.input'
import { UserSeasonTopic } from './entities/user-season-topic.entity'
import { UserSeasonTopicService } from './user-season-topic.service'
import { PaginationUserTopic } from '../../common/page/pagination-info'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterUserSeasonTopicInput } from './dto/filter-user-season-topic-input'

@Resolver(() => UserSeasonTopic)
export class UserSeasonTopicResolver {
  constructor(private readonly userTopicService: UserSeasonTopicService) {}

  @Mutation(() => UserSeasonTopic)
  async createUserTopic(
    @Args('createUserTopicInput') createUserTopicInput: CreateUserSeasonTopicInput,
  ) {
    return this.userTopicService.create(createUserTopicInput)
  }

  @Query(() => PaginationUserTopic)
  async userTopics(
    @Args('filterUserTopicInput', { type: () => FilterUserSeasonTopicInput, nullable: true })
    filterUserTopicInput?: FilterUserSeasonTopicInput,
    @Args('pageInfoInput', { type: () => PaginationInput, nullable: true })
    pageInfoInput?: PaginationInput,
  ) {
    return this.userTopicService.findAll(filterUserTopicInput, pageInfoInput)
  }

  @Query(() => UserSeasonTopic)
  async userTopic(@Args('userId') userId: string, @Args('topicId') topicId: string) {
    return this.userTopicService.findOne(userId, topicId)
  }

  @Mutation(() => UserSeasonTopic)
  async updateUserTopic(
    @Args('updateUserTopicInput') updateUserTopicInput: UpdateUserSeasonTopicInput,
  ) {
    return this.userTopicService.update(updateUserTopicInput)
  }

  @ResolveField(() => User)
  user(@Parent() userTopic: UserSeasonTopic) {
    return userTopic.user
  }

  @ResolveField(() => Topic)
  topic(@Parent() userTopic: UserSeasonTopic) {
    return userTopic.topic
  }

  @Mutation(() => UserSeasonTopic)
  async removeUserTopic(@Args('userTopicId') userTopicId: UserTopicId) {
    return this.userTopicService.remove(userTopicId)
  }
}
