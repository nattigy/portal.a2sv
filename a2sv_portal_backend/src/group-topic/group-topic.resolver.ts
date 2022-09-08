import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { GroupTopicService } from './group-topic.service'
import { GroupTopic } from './entities/group-topic.entity'
import { CreateGroupTopicInput } from './dto/create-group-topic.input'
import { UpdateGroupTopicInput } from './dto/update-group-topic.input'
import { Group } from 'src/groups/entities/group.entity'
import { Topic } from 'src/topic/entities/topic.entity'
import { GroupTopicProblem } from 'src/group-topic-problem/entities/group-topic-problem.entity'

@Resolver(() => GroupTopic)
export class GroupTopicResolver {
  constructor(private readonly groupTopicService: GroupTopicService) {}

  @Mutation(() => GroupTopic)
  async createGroupTopic(
    @Args('createGroupTopicInput') createGroupTopicInput: CreateGroupTopicInput,
  ) {
    return this.groupTopicService.create(createGroupTopicInput)
  }

  @Query(() => [GroupTopic], { name: 'groupTopics' })
  async findAll() {
    return await this.groupTopicService.findAll()
  }

  @Query(() => GroupTopic, { name: 'groupTopic' })
  async findOne(
    @Args('groupId', { type: () => Int }) groupId: number,
    @Args('topicId', { type: () => Int }) topicId: number,
  ) {
    return await this.groupTopicService.findOne(groupId, topicId)
  }

  @Mutation(() => GroupTopic)
  async updateGroupTopic(
    @Args('updateGroupTopicInput') updateGroupTopicInput: UpdateGroupTopicInput,
  ) {
    return await this.groupTopicService.update(updateGroupTopicInput)
  }

  @Mutation(() => GroupTopic)
  removeGroupTopic(
    @Args('groupId', { type: () => Int }) groupId: number,
    @Args('topicId', { type: () => Int }) topicId: number,
  ) {
    return this.groupTopicService.remove(groupId, topicId)
  }

  @ResolveField(() => Group, { nullable: true })
  group(@Parent() groupTopic: GroupTopic): Group | null {
    return groupTopic.group
  }

  @ResolveField(() => Topic, { nullable: true })
  topic(@Parent() groupTopic: GroupTopic): Topic | null {
    return groupTopic.topic
  }

  @ResolveField(() => [GroupTopicProblem])
  problems(@Parent() groupTopic: GroupTopic): GroupTopicProblem[] {
    return groupTopic.problems
  }
}
