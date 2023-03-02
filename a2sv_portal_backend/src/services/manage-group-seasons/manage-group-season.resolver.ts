import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GroupSeasonService } from './group-season.service'
import { ManageGroupSeasonTopicService } from './group-season-topic.service'
import { GroupSeasonTopicProblemService } from './group-season-topic-problem.service'
import { BadRequestException, UseGuards } from '@nestjs/common'
import { PoliciesGuard } from '../../casl/policy/policy.guard'
import { CheckPolicies } from '../../casl/policy/policy.decorator'
import { GroupSeasonAbilities } from '../../casl/handler/group-season-abilities.handler'
import { GroupSeason } from '../../app/group-season/entities/group-season.entity'
import {
  CreateGroupSeasonInput,
  GroupSeasonId,
} from '../../app/group-season/dto/create-group-season.input'
import { PaginationGroupSeason } from '../../common/page/pagination-info'
import { FilterGroupSeasonInput } from '../../app/group-season/dto/filter-group-season.input'
import { PaginationInput } from '../../common/page/pagination.input'
import {
  UpdateGroupSeasonInput,
  UpdateGroupSeasonJoinRequestInput,
} from '../../app/group-season/dto/update-group-season.input'
import { GroupSeasonTopicAbilities } from '../../casl/handler/group-season-topic-abilities.handler'
import { GroupSeasonTopic } from '../../app/group-season-topic/entities/group-season-topic.entity'
import { GroupSeasonTopicId } from '../../app/group-season-topic/dto/create-group-season-topic.input'
import { GroupSeasonTopicProblemAbilities } from '../../casl/handler/group-season-topic-problem-abilities.handler'

@Resolver()
export class ManageGroupSeasonResolver {
  constructor(
    private readonly groupSeasonService: GroupSeasonService,
    private readonly groupSeasonTopicService: ManageGroupSeasonTopicService,
    private readonly groupSeasonTopicProblemService: GroupSeasonTopicProblemService, // private readonly groupSeasonContestService: GroupSeasonContestService, // private readonly groupSeasonContestProblemService: GroupSeasonContestProblemService,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupSeasonAbilities.create)
  @Mutation(() => GroupSeason)
  async addGroupToASeason(
    @Args('addGroupToASeasonInput') createGroupSeasonInput: CreateGroupSeasonInput,
  ): Promise<GroupSeason> {
    try {
      return this.groupSeasonService.addGroupToASeason(createGroupSeasonInput)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to add group to a season!')
    }
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupSeasonAbilities.read)
  @Query(() => GroupSeason)
  async groupSeason(
    @Args('groupSeasonId') groupSeasonId: GroupSeasonId,
  ): Promise<GroupSeason> {
    try {
      return this.groupSeasonService.groupSeason(groupSeasonId)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to load group season!')
    }
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupSeasonAbilities.read)
  @Query(() => PaginationGroupSeason)
  async groupSeasons(
    @Args('filterGroupSeasonInput') filterGroupSeasonInput: FilterGroupSeasonInput,
    @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  ): Promise<PaginationGroupSeason> {
    try {
      return this.groupSeasonService.groupsSeasons(filterGroupSeasonInput, paginationInput)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to load groupSeason!')
    }
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupSeasonAbilities.update)
  @Mutation(() => GroupSeason)
  async updateGroupSeason(
    @Args('updateGroupSeasonInput') updateGroupSeasonInput: UpdateGroupSeasonInput,
  ): Promise<GroupSeason> {
    try {
      return this.groupSeasonService.updateGroupSeason(updateGroupSeasonInput)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to update group season!')
    }
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupSeasonAbilities.update)
  @Mutation(() => GroupSeason)
  async updateGroupSeasonJoinRequest(
    @Args('updateGroupSeasonJoinRequestInput')
    updateGroupSeasonJoinRequestInput: UpdateGroupSeasonJoinRequestInput,
  ): Promise<GroupSeason> {
    try {
      return this.groupSeasonService.updateGroupSeasonJoinRequest(
        updateGroupSeasonJoinRequestInput,
      )
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to update join request!')
    }
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupSeasonAbilities.delete)
  @Mutation(() => GroupSeason)
  async removeGroupFromASeason(@Args('groupSeasonId') groupSeasonId: GroupSeasonId) {
    try {
      return this.groupSeasonService.removeGroupFromASeason(groupSeasonId)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to remove group from a season!')
    }
  }

  // @Mutation(() => GroupSeasonTopic)
  // async addTopicToGroupSeason(
  //   @Args('createGroupSeasonTopicInput')
  //   createGroupSeasonTopicInput: CreateGroupSeasonTopicInput,
  // ): Promise<GroupSeasonTopic> {
  //   return this.groupSeasonTopicService.addTopicToGroupSeason(createGroupSeasonTopicInput)
  // }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupSeasonTopicAbilities.create)
  @Mutation(() => Int)
  async addTopicsToGroupSeason(
    @Args('groupSeasonId') { groupId, seasonId }: GroupSeasonId,
    @Args('topicIds', { type: () => [String] }) topicIds: string[],
  ): Promise<number> {
    try {
      for (const topicId of topicIds) {
        await this.groupSeasonTopicService.addTopicToGroupSeason({
          groupId,
          topicId,
          seasonId,
        })
      }
      return topicIds.length
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to add topics to a season!')
    }
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
  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupSeasonTopicProblemAbilities.create)
  @Mutation(() => Int)
  async addProblemsToGroupSeasonTopic(
    @Args('groupSeasonTopicId') { groupId, topicId, seasonId }: GroupSeasonTopicId,
    @Args('problemIds', { type: () => [String] }) problemIds: string[],
  ): Promise<number> {
    try {
      for (const problemId of problemIds) {
        await this.groupSeasonTopicProblemService.addProblemToGroupSeasonTopic({
          problemId,
          groupId,
          topicId,
          seasonId,
        })
      }
      return problemIds.length
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to add problems to a groupSeasonTopic!')
    }
  }

  // @Mutation(() => GroupSeasonTopicProblem)
  // async removeGroupSeasonTopicProblem(
  //   @Args('groupSeasonTopicProblemId') groupSeasonTopicProblemId: GroupSeasonTopicProblemId,
  // ) {
  //   return this.groupSeasonTopicProblemService.removeGroupSeasonTopicProblem(
  //     groupSeasonTopicProblemId,
  //   )
  // }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupSeasonTopicProblemAbilities.delete)
  @Mutation(() => Int)
  async removeGroupSeasonTopicProblems(
    @Args('groupSeasonTopicId') { groupId, topicId, seasonId }: GroupSeasonTopicId,
    @Args('problemIds', { type: () => [String] }) problemIds: string[],
  ): Promise<number> {
    try {
      for (const problemId of problemIds) {
        await this.groupSeasonTopicProblemService.removeGroupSeasonTopicProblem({
          problemId,
          groupId,
          topicId,
          seasonId,
        })
      }
      return problemIds.length
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to remove problems from groupSeasonTopic!')
    }
  }
}
