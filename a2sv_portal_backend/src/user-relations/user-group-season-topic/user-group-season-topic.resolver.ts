import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserGroupSeasonTopicId } from './dto/create-user-group-season-topic.input'
import { UpdateUserGroupSeasonTopicInput } from './dto/update-user-group-season-topic.input'
import { UserGroupSeasonTopic } from './entities/user-group-season-topic.entity'
import { UserGroupSeasonTopicService } from './user-group-season-topic.service'
import { PaginationUserGroupSeasonTopic } from '../../common/page/pagination-info'
import { FilterUserGroupSeasonTopicInput } from './dto/filter-user-group-season-topic-input'
import { PaginationInput } from '../../common/page/pagination.input'
import { UserGroupSeasonTopicProblem } from '../user-group-season-topic-problem/entities/user-group-season-topic-problem.entity'
import { UpdateUserGroupSeasonTopicProblemInput } from '../user-group-season-topic-problem/dto/update-user-group-season-topic-problem.input'

@Resolver(() => UserGroupSeasonTopic)
export class UserGroupSeasonTopicResolver {
  constructor(private readonly userGroupSeasonTopicService: UserGroupSeasonTopicService) {}

  @Query(() => UserGroupSeasonTopic)
  async userGroupSeasonTopic(
    @Args('userGroupSeasonTopicId') userGroupSeasonTopicId: UserGroupSeasonTopicId,
  ) {
    return this.userGroupSeasonTopicService.userGroupSeasonTopic(userGroupSeasonTopicId)
  }

  @Query(() => PaginationUserGroupSeasonTopic)
  async userGroupSeasonTopics(
    @Args('filterUserGroupSeasonTopicInput', { nullable: true })
    filterUserGroupSeasonTopicInput?: FilterUserGroupSeasonTopicInput,
    @Args('pageInfoInput', { nullable: true })
    pageInfoInput?: PaginationInput,
  ) {
    return this.userGroupSeasonTopicService.userGroupSeasonTopics(
      filterUserGroupSeasonTopicInput,
      pageInfoInput,
    )
  }

  @Mutation(() => UserGroupSeasonTopic)
  async updateUserGroupSeasonTopic(
    @Args('updateUserGroupSeasonTopicInput')
    updateUserGroupSeasonTopicInput: UpdateUserGroupSeasonTopicInput,
  ) {
    return this.userGroupSeasonTopicService.updateUserGroupSeasonTopic(
      updateUserGroupSeasonTopicInput,
    )
  }

  @Mutation(() => UserGroupSeasonTopicProblem)
  async updateUserGroupSeasonTopicProblem(
    @Args('updateUserGroupSeasonTopicProblemInput')
    updateUserGroupSeasonTopicProblemInput: UpdateUserGroupSeasonTopicProblemInput,
  ): Promise<UserGroupSeasonTopicProblem> {
    return this.userGroupSeasonTopicService.updateUserGroupSeasonTopicProblem(
      updateUserGroupSeasonTopicProblemInput,
    )
  }

  // @Mutation(() => UserGroupSeasonTopic)
  // async removeUserGroupSeasonTopic(
  //   @Args('userGroupSeasonTopicId') userGroupSeasonTopicId: UserGroupSeasonTopicId,
  // ) {
  //   return this.userGroupSeasonTopicService.removeUserGroupSeasonTopic(userGroupSeasonTopicId)
  // }
}
