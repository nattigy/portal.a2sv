import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  CreateUserSeasonTopicInput,
  UserSeasonTopicId,
} from './dto/create-user-season-topic.input'
import { UpdateUserSeasonTopicInput } from './dto/update-user-season-topic.input'
import { UserSeasonTopic } from './entities/user-season-topic.entity'
import { UserSeasonTopicService } from './user-season-topic.service'
import { PaginationUserSeasonTopic } from '../../common/page/pagination-info'
import { PaginationInput } from '../../common/page/pagination.input'
import { FilterUserSeasonTopicInput } from './dto/filter-user-season-topic-input'

@Resolver(() => UserSeasonTopic)
export class UserSeasonTopicResolver {
  constructor(private readonly userSeasonTopicService: UserSeasonTopicService) {}

  @Mutation(() => UserSeasonTopic)
  async createUserSeasonTopic(
    @Args('createUserSeasonTopicInput') createUserSeasonTopicInput: CreateUserSeasonTopicInput,
  ) {
    return this.userSeasonTopicService.createUserSeasonTopic(createUserSeasonTopicInput)
  }

  @Query(() => PaginationUserSeasonTopic)
  async userSeasonTopics(
    @Args('filterUserSeasonTopicInput', { nullable: true })
    filterUserSeasonTopicInput?: FilterUserSeasonTopicInput,
    @Args('pageInfoInput', { nullable: true })
    pageInfoInput?: PaginationInput,
  ) {
    return this.userSeasonTopicService.userSeasonTopics(
      filterUserSeasonTopicInput,
      pageInfoInput,
    )
  }

  @Query(() => UserSeasonTopic)
  async userSeasonTopic(@Args('userSeasonTopicId') userSeasonTopicId: UserSeasonTopicId) {
    return this.userSeasonTopicService.userSeasonTopic(userSeasonTopicId)
  }

  @Mutation(() => UserSeasonTopic)
  async updateUserSeasonTopic(
    @Args('updateUserSeasonTopicInput') updateUserSeasonTopicInput: UpdateUserSeasonTopicInput,
  ) {
    return this.userSeasonTopicService.updateUserSeasonTopic(updateUserSeasonTopicInput)
  }

  @Mutation(() => UserSeasonTopic)
  async removeUserSeasonTopic(
    @Args('userSeasonTopicId') userSeasonTopicId: UserSeasonTopicId,
  ) {
    return this.userSeasonTopicService.removeUserSeasonTopic(userSeasonTopicId)
  }
}
