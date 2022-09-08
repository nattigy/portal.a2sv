import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { GroupTopicProblemService } from './group-topic-problem.service'
import { GroupTopicProblem } from './entities/group-topic-problem.entity'
import { CreateGroupTopicProblemInput } from './dto/create-group-topic-problem.input'
import { UpdateGroupTopicProblemInput } from './dto/update-group-topic-problem.input'
import { Problem } from 'src/problem/entities/problem.entity'

@Resolver(() => GroupTopicProblem)
export class GroupTopicProblemResolver {
  constructor(
    private readonly groupTopicProblemService: GroupTopicProblemService,
  ) {}

  @Mutation(() => GroupTopicProblem)
  async createGroupTopicProblem(
    @Args('createGroupTopicProblemInput')
    createGroupTopicProblemInput: CreateGroupTopicProblemInput,
  ) {
    return await this.groupTopicProblemService.create(
      createGroupTopicProblemInput,
    )
  }

  @Query(() => [GroupTopicProblem], { name: 'groupTopicProblems' })
  async findAll() {
    return await this.groupTopicProblemService.findAll()
  }

  @Query(() => GroupTopicProblem, { name: 'groupTopicProblem' })
  async findOne(
    @Args('id', { type: () => Int }) groupId: number,
    @Args('id', { type: () => Int }) topicId: number,
    @Args('id', { type: () => Int }) problemId: number,
  ) {
    return await this.groupTopicProblemService.findOne(
      groupId,
      topicId,
      problemId,
    )
  }

  @Mutation(() => GroupTopicProblem)
  async cupdateGroupTopicProblem(
    @Args('updateGroupTopicProblemInput')
    updateGroupTopicProblemInput: UpdateGroupTopicProblemInput,
  ) {
    return await this.groupTopicProblemService.update(
      updateGroupTopicProblemInput,
    )
  }

  @Mutation(() => GroupTopicProblem)
  removeGroupTopicProblem(
    @Args('groupId', { type: () => Int }) groupId: number,
    @Args('topicId', { type: () => Int }) topicId: number,
    @Args('problemId', { type: () => Int }) problemId: number,
  ) {
    return this.groupTopicProblemService.remove(groupId, topicId, problemId)
  }

  @ResolveField(() => Problem)
  problem(@Parent() groupTopicProblem: GroupTopicProblem) {
    return groupTopicProblem.problem
  }
}
