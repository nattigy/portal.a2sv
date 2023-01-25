import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UserGroupSeasonTopic } from './entities/user-group-season-topic.entity'
import { UserGroupSeasonTopicId } from './dto/create-user-group-season-topic.input'
import { UserGroupSeasonTopicService } from './user-group-season-topic.service'

@Resolver()
export class UserGroupSeasonTopicResolver {
  constructor(private readonly userGroupSeasonTopicService: UserGroupSeasonTopicService) {}

  @Mutation(() => UserGroupSeasonTopic)
  async removeUserGroupSeasonTopic(
    @Args('userGroupSeasonTopicId') userGroupSeasonTopicId: UserGroupSeasonTopicId,
  ) {
    return this.userGroupSeasonTopicService.removeUserGroupSeasonTopic(userGroupSeasonTopicId)
  }
}
