import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserGroupSeasonTopicId } from './dto/create-user-season-topic.input'
import { UpdateUserGroupSeasonTopicInput } from './dto/update-user-season-topic.input'
import { UserGroupSeasonTopic } from './entities/user-season-topic.entity'
import { UserGroupSeasonTopicService } from './user-season-topic.service'
import { PaginationUserGroupSeasonTopic } from '../../common/page/pagination-info'
import { FilterUserGroupSeasonTopicInput } from './dto/filter-user-season-topic-input'
import { PaginationInput } from '../../common/page/pagination.input'

@Resolver(() => UserGroupSeasonTopic)
export class UserGroupSeasonTopicResolver {
  constructor(private readonly UserGroupSeasonTopicService: UserGroupSeasonTopicService) {}

  @Query(() => UserGroupSeasonTopic)
  async UserGroupSeasonTopic(@Args('UserGroupSeasonTopicId') UserGroupSeasonTopicId: UserGroupSeasonTopicId) {
    return this.UserGroupSeasonTopicService.UserGroupSeasonTopic(UserGroupSeasonTopicId)
  }

  @Query(() => PaginationUserGroupSeasonTopic)
  async UserGroupSeasonTopics(
    @Args('filterUserGroupSeasonTopicInput', { nullable: true })
    filterUserGroupSeasonTopicInput?: FilterUserGroupSeasonTopicInput,
    @Args('pageInfoInput', { nullable: true })
    pageInfoInput?: PaginationInput,
  ) {
    return this.UserGroupSeasonTopicService.UserGroupSeasonTopics(
      filterUserGroupSeasonTopicInput,
      pageInfoInput,
    )
  }

  @Mutation(() => UserGroupSeasonTopic)
  async updateUserGroupSeasonTopic(
    @Args('updateUserGroupSeasonTopicInput') updateUserGroupSeasonTopicInput: UpdateUserGroupSeasonTopicInput,
  ) {
    return this.UserGroupSeasonTopicService.updateUserGroupSeasonTopic(updateUserGroupSeasonTopicInput)
  }

  @Mutation(() => UserGroupSeasonTopic)
  async removeUserGroupSeasonTopic(
    @Args('UserGroupSeasonTopicId') UserGroupSeasonTopicId: UserGroupSeasonTopicId,
  ) {
    return this.UserGroupSeasonTopicService.removeUserGroupSeasonTopic(UserGroupSeasonTopicId)
  }
}
