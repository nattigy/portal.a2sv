import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { UserTopicService } from './user-topic.service'
import { UserTopic } from './entities/user-topic.entity'
import { CreateUserTopicInput } from './dto/create-user-topic.input'
import { UpdateUserTopicInput } from './dto/update-user-topic.input'
import { User } from '../user/entities/user.entity'
import { Topic } from '../topic/entities/topic.entity'

@Resolver(() => UserTopic)
export class UserTopicResolver {
  constructor(private readonly userTopicService: UserTopicService) {}

  @Mutation(() => UserTopic)
  createUserTopic(
    @Args('createUserTopicInput') createUserTopicInput: CreateUserTopicInput,
  ) {
    return this.userTopicService.create(createUserTopicInput)
  }

  @Query(() => [UserTopic], { name: 'userTopic' })
  findAll() {
    return this.userTopicService.findAll()
  }

  @Query(() => UserTopic, { name: 'userTopic' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userTopicService.findOne(id)
  }

  @Mutation(() => UserTopic)
  updateUserTopic(
    @Args('updateUserTopicInput') updateUserTopicInput: UpdateUserTopicInput,
  ) {
    return this.userTopicService.update(
      updateUserTopicInput.id,
      updateUserTopicInput,
    )
  }

  @Mutation(() => UserTopic)
  removeUserTopic(@Args('id', { type: () => String }) id: string) {
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
