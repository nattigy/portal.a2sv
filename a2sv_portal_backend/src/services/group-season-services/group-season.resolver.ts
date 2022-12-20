import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GroupSeasonService } from './group-season.service'
import { GroupSeason } from '../../app/group-season/entities/group-season.entity'
import {
  CreateGroupSeasonInput,
  GroupSeasonId,
} from '../../app/group-season/dto/create-group-season.input'
import { PaginationInput } from '../../common/page/pagination.input'
import {
  UpdateGroupSeasonInput,
  UpdateGroupSeasonJoinRequestInput,
} from '../../app/group-season/dto/update-group-season.input'
import { PaginationGroupSeason } from '../../common/page/pagination-info'
import { GroupSeasonTopicId } from '../../app/group-season-topic/dto/create-group-season-topic.input'
import { GroupSeasonTopic } from '../../app/group-season-topic/entities/group-season-topic.entity'
import { GroupSeasonTopicProblem } from '../../app/group-season-topic-problem/entities/group-season-topic-problem.entity'
import { GroupSeasonTopicProblemService } from './group-season-topic-problem.service'
import { GroupSeasonTopicService } from './group-season-topic.service'
import { FilterGroupSeasonInput } from '../../app/group-season/dto/filter-group-season.input'

@Resolver(() => GroupSeason)
export class GroupSeasonResolver {
  constructor(
    private readonly groupSeasonService: GroupSeasonService,
    private readonly groupSeasonTopicService: GroupSeasonTopicService,
    private readonly groupSeasonTopicProblemService: GroupSeasonTopicProblemService,
  ) {}

  @Mutation(() => GroupSeason)
  async addGroupToASeason(
    @Args('addGroupToASeasonInput') createGroupSeasonInput: CreateGroupSeasonInput,
  ): Promise<GroupSeason> {
    return this.groupSeasonService.addGroupToASeason(createGroupSeasonInput)
  }

  @Query(() => GroupSeason)
  async groupSeason(
    @Args('groupSeasonId') groupSeasonId: GroupSeasonId,
  ): Promise<GroupSeason> {
    return this.groupSeasonService.groupSeason(groupSeasonId)
  }

  @Query(() => PaginationGroupSeason)
  async groupSeasons(
    @Args('filterGroupSeasonInput') filterGroupSeasonInput:FilterGroupSeasonInput,
    // @Args('groupId') groupId: string,
    @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  ): Promise<PaginationGroupSeason> {
    return this.groupSeasonService.groupsSeasons(filterGroupSeasonInput, paginationInput)
  }

  @Mutation(() => GroupSeason)
  async updateGroupSeason(
    @Args('updateGroupSeasonInput') updateGroupSeasonInput: UpdateGroupSeasonInput,
  ): Promise<GroupSeason> {
    return this.groupSeasonService.updateGroupSeason(updateGroupSeasonInput)
  }

  @Mutation(() => GroupSeason)
  async updateGroupSeasonJoinRequest(
    @Args('updateGroupSeasonJoinRequestInput')
    updateGroupSeasonJoinRequestInput: UpdateGroupSeasonJoinRequestInput,
  ): Promise<GroupSeason> {
    return this.groupSeasonService.updateGroupSeasonJoinRequest(
      updateGroupSeasonJoinRequestInput,
    )
  }

  @Mutation(() => GroupSeason)
  async removeGroupFromASeason(@Args('groupSeasonId') groupSeasonId: GroupSeasonId) {
    return this.groupSeasonService.removeGroupFromASeason(groupSeasonId)
  }

  // @Mutation(() => GroupSeasonTopic)
  // async addTopicToGroupSeason(
  //   @Args('createGroupSeasonTopicInput')
  //   createGroupSeasonTopicInput: CreateGroupSeasonTopicInput,
  // ): Promise<GroupSeasonTopic> {
  //   return this.groupSeasonTopicService.addTopicToGroupSeason(createGroupSeasonTopicInput)
  // }

  @Mutation(() => Int)
  async addTopicsToGroupSeason(
    @Args('groupSeasonId') { groupId, seasonId }: GroupSeasonId,
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

  // @Mutation(() => GroupSeasonTopicProblem)
  // async addProblemToGroupSeasonTopic(
  //   @Args('createGroupSeasonTopicProblemInput')
  //   createGroupSeasonTopicProblemInput: CreateGroupSeasonTopicProblemInput,
  // ): Promise<GroupSeasonTopicProblem> {
  //   return this.groupSeasonTopicProblemService.addProblemToGroupSeasonTopic(
  //     createGroupSeasonTopicProblemInput,
  //   )
  // }

  // @Query(() => GroupSeasonTopicProblem)
  // async groupSeasonTopicProblem(
  //   @Args('groupSeasonTopicProblemId') groupSeasonTopicProblemId: GroupSeasonTopicProblemId,
  // ): Promise<GroupSeasonTopicProblem> {
  //   return this.groupSeasonTopicProblemService.groupSeasonTopicProblem(
  //     groupSeasonTopicProblemId,
  //   )
  // }

  // @Query(() => [GroupSeasonTopicProblem])
  // async groupSeasonTopicProblems(
  //   @Args('groupSeasonTopicId') groupSeasonTopicId: GroupSeasonTopicId,
  //   @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  // ): Promise<GroupSeasonTopicProblem[]> {
  //   return this.groupSeasonTopicProblemService.groupSeasonTopicProblems(
  //     groupSeasonTopicId,
  //     paginationInput,
  //   )
  // }

  @Mutation(() => Int)
  async addProblemsToGroupSeasonTopic(
    @Args('groupSeasonTopicId') { groupId, topicId, seasonId }: GroupSeasonTopicId,
    @Args('problemIds', { type: () => [String] }) problemIds: string[],
  ): Promise<number> {
    for (const problemId of problemIds) {
      await this.groupSeasonTopicProblemService.addProblemToGroupSeasonTopic({
        problemId,
        groupId,
        topicId,
        seasonId,
      })
    }
    return problemIds.length
  }

  // @Mutation(() => GroupSeasonTopicProblem)
  // async removeGroupSeasonTopicProblem(
  //   @Args('groupSeasonTopicProblemId') groupSeasonTopicProblemId: GroupSeasonTopicProblemId,
  // ) {
  //   return this.groupSeasonTopicProblemService.removeGroupSeasonTopicProblem(
  //     groupSeasonTopicProblemId,
  //   )
  // }

  @Mutation(() => GroupSeasonTopicProblem)
  async removeGroupSeasonTopicProblems(
    @Args('groupSeasonTopicId') { groupId, topicId, seasonId }: GroupSeasonTopicId,
    @Args('problemIds', { type: () => [String] }) problemIds: string[],
  ): Promise<number> {
    for (const problemId of problemIds) {
      await this.groupSeasonTopicProblemService.removeGroupSeasonTopicProblem({
        problemId,
        groupId,
        topicId,
        seasonId,
      })
    }
    return problemIds.length
  }
}
