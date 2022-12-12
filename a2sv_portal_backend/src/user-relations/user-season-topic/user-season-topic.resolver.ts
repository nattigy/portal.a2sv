import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserSeasonTopicId } from './dto/create-user-season-topic.input'
import { UpdateUserSeasonTopicInput } from './dto/update-user-season-topic.input'
import { UserSeasonTopic } from './entities/user-season-topic.entity'
import { UserSeasonTopicService } from './user-season-topic.service'
import { PaginationUserSeasonTopic } from '../../common/page/pagination-info'
import { FilterUserSeasonTopicInput } from './dto/filter-user-season-topic-input'
import { PaginationInput } from '../../common/page/pagination.input'

@Resolver(() => UserSeasonTopic)
export class UserSeasonTopicResolver {
  constructor(private readonly userSeasonTopicService: UserSeasonTopicService) {}

  @Query(() => UserSeasonTopic)
  async userSeasonTopic(@Args('userSeasonTopicId') userSeasonTopicId: UserSeasonTopicId) {
    return this.userSeasonTopicService.userSeasonTopic(userSeasonTopicId)
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
