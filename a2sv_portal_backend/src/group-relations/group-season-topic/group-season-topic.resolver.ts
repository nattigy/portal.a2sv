import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GroupSeasonTopicService } from './group-season-topic.service'
import { GroupSeasonTopic } from './entities/group-season-topic.entity'
import {
  CreateGroupSeasonTopicInput,
  GroupSeasonTopicId,
} from './dto/create-group-season-topic.input'
import { GroupSeasonId } from '../group-season/dto/create-group-season.input'
import { PaginationInput } from '../../common/page/pagination.input'

@Resolver(() => GroupSeasonTopic)
export class GroupSeasonTopicResolver {
  constructor(private readonly groupSeasonTopicService: GroupSeasonTopicService) {}

  // @Mutation(() => GroupSeasonTopic)
  // async addTopicToGroupSeason(
  //   @Args('createGroupSeasonTopicInput')
  //   createGroupSeasonTopicInput: CreateGroupSeasonTopicInput,
  // ): Promise<GroupSeasonTopic> {
  //   return this.groupSeasonTopicService.addTopicToGroupSeason(createGroupSeasonTopicInput)
  // }

  @Mutation(() => Int)
  async addTopicsToGroupSeason(
    @Args('groupSeasonTopicId') { groupId, seasonId }: GroupSeasonTopicId,
    @Args('topicIds', { type: () => [String] }) topicIds: string[],
  ): Promise<number> {
    for (const topicId of topicIds) {
      await this.groupSeasonTopicService.addTopicToGroupSeason({
        groupId,
        topicId,
        seasonId,
      })
    }
    return topicIds.length
  }

  @Query(() => GroupSeasonTopic)
  async groupSeasonTopic(@Args('groupSeasonTopicId') groupSeasonTopicId: GroupSeasonTopicId) {
    return this.groupSeasonTopicService.groupSeasonTopic(groupSeasonTopicId)
  }

  @Query(() => [GroupSeasonTopic])
  async groupSeasonTopics(
    @Args('groupSeasonId') groupSeasonId: GroupSeasonId,
    @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  ) {
    return this.groupSeasonTopicService.groupSeasonTopics(groupSeasonId, paginationInput)
  }

  @Mutation(() => GroupSeasonTopic)
  async removeGroupSeasonTopic(
    @Args('groupSeasonTopicId') groupSeasonTopicId: GroupSeasonTopicId,
  ) {
    return this.groupSeasonTopicService.removeGroupSeasonTopic(groupSeasonTopicId)
  }
}
