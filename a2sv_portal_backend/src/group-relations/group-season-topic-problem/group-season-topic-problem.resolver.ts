import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GroupSeasonTopicProblemService } from './group-season-topic-problem.service'
import { GroupSeasonTopicProblem } from './entities/group-season-topic-problem.entity'
import {
  CreateGroupSeasonTopicProblemInput,
  GroupSeasonTopicProblemId,
} from './dto/create-group-season-topic-problem.input'
import { GroupSeasonTopicId } from '../group-season-topic/dto/create-group-season-topic.input'
import { PaginationInput } from '../../common/page/pagination.input'

@Resolver(() => GroupSeasonTopicProblem)
export class GroupSeasonTopicProblemResolver {
  constructor(
    private readonly groupSeasonTopicProblemService: GroupSeasonTopicProblemService,
  ) {}

  @Mutation(() => GroupSeasonTopicProblem)
  async addProblemToGroupSeasonTopic(
    @Args('createGroupSeasonTopicProblemInput')
    createGroupSeasonTopicProblemInput: CreateGroupSeasonTopicProblemInput,
  ): Promise<GroupSeasonTopicProblem> {
    return this.groupSeasonTopicProblemService.addProblemToGroupSeasonTopic(
      createGroupSeasonTopicProblemInput,
    )
  }

  @Query(() => GroupSeasonTopicProblem)
  async groupSeasonTopicProblem(
    @Args('groupSeasonTopicProblemId') groupSeasonTopicProblemId: GroupSeasonTopicProblemId,
  ): Promise<GroupSeasonTopicProblem> {
    return this.groupSeasonTopicProblemService.groupSeasonTopicProblem(
      groupSeasonTopicProblemId,
    )
  }

  @Query(() => [GroupSeasonTopicProblem])
  async groupSeasonTopicProblems(
    @Args('groupSeasonTopicId') groupSeasonTopicId: GroupSeasonTopicId,
    @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  ): Promise<GroupSeasonTopicProblem[]> {
    return this.groupSeasonTopicProblemService.groupSeasonTopicProblems(
      groupSeasonTopicId,
      paginationInput,
    )
  }

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

  @Mutation(() => GroupSeasonTopicProblem)
  async removeGroupSeasonTopicProblem(
    @Args('groupSeasonTopicProblemId') groupSeasonTopicProblemId: GroupSeasonTopicProblemId,
  ) {
    return this.groupSeasonTopicProblemService.removeGroupSeasonTopicProblem(
      groupSeasonTopicProblemId,
    )
  }

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
