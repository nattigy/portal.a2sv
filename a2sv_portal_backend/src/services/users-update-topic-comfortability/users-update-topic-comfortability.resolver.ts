import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UsersUpdateTopicComfortabilityService } from './users-update-topic-comfortability.service'
import { UserGroupSeasonTopic } from '../../app/user-group-season-topic/entities/user-group-season-topic.entity'
import { UpdateUserGroupSeasonTopicInput } from '../../app/user-group-season-topic/dto/update-user-group-season-topic.input'

@Resolver()
export class UsersUpdateTopicComfortabilityResolver {
  constructor(
    private readonly usersUpdateTopicComfortabilityService: UsersUpdateTopicComfortabilityService,
  ) {}

  @Mutation(() => UserGroupSeasonTopic)
  async updateUserTopicComfortability(
    @Args('updateUserTopicComfortabilityInput')
    updateUserTopicComfortabilityInput: UpdateUserGroupSeasonTopicInput,
  ) {
    return this.usersUpdateTopicComfortabilityService.updateUserTopicComfortability(
      updateUserTopicComfortabilityInput,
    )
  }
}
