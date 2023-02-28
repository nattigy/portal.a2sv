import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GroupSeasonTopicService } from './group-season-topic.service'
import { BadRequestException, UseGuards } from '@nestjs/common'
import { PoliciesGuard } from '../../casl/policy/policy.guard'
import { CheckPolicies } from '../../casl/policy/policy.decorator'
import { PaginationInput } from '../../common/page/pagination.input'
import { GroupSeasonTopicAbilities } from '../../casl/handler/group-season-topic-abilities.handler'
import { GroupSeasonTopic } from './entities/group-season-topic.entity'
import { GroupSeasonTopicId } from './dto/create-group-season-topic.input'
import { GroupSeasonId } from '../group-season/dto/create-group-season.input'

@Resolver()
export class GroupSeasonTopicResolver {
  constructor(
    private readonly groupSeasonTopicService: GroupSeasonTopicService,
  ) {
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupSeasonTopicAbilities.read)
  @Query(() => GroupSeasonTopic)
  async groupSeasonTopic(@Args('groupSeasonTopicId') groupSeasonTopicId: GroupSeasonTopicId) {
    try {
      return this.groupSeasonTopicService.groupSeasonTopic(groupSeasonTopicId)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to load groupSeasonTopic!')
    }
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupSeasonTopicAbilities.read)
  @Query(() => [GroupSeasonTopic])
  async groupSeasonTopics(
    @Args('groupSeasonId') groupSeasonId: GroupSeasonId,
    @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  ) {
    try {
      return this.groupSeasonTopicService.groupSeasonTopics(groupSeasonId, paginationInput)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to load groupSeasonTopics!')
    }
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupSeasonTopicAbilities.delete)
  @Mutation(() => Int)
  async removeGroupSeasonTopics(
    @Args('groupSeasonId') groupSeasonId: GroupSeasonId,
    @Args('problemIds', { type: () => [String] }) topicIds: string[],
  ) {
    try {
      for (const topicId of topicIds) {
        await this.groupSeasonTopicService.removeGroupSeasonTopic({
          ...groupSeasonId,
          topicId,
        })
      }
      return topicIds.length
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to remove group season topic!')
    }
  }
}
