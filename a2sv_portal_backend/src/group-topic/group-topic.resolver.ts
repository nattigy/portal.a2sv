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

@Resolver(() => GroupTopic)
export class GroupTopicResolver {
  constructor(private readonly groupTopicService: GroupTopicService) {}

  @Mutation(() => GroupTopic)
  createGroupTopic(
    @Args('createGroupTopicInput') createGroupTopicInput: CreateGroupTopicInput,
  ) {
    return this.groupTopicService.create(createGroupTopicInput)
  }

  @Query(() => [GroupTopic], { name: 'groupTopic' })
  findAll() {
    return this.groupTopicService.findAll()
  }

  @Query(() => GroupTopic, { name: 'groupTopic' })
  findOne(
    @Args('groupId', { type: () => Int }) groupId: number,
    @Args('topicId', { type: () => Int }) topicId: number,
  ) {
    return this.groupTopicService.findOne(groupId, topicId)
  }

  @Mutation(() => GroupTopic)
  updateGroupTopic(
    @Args('updateGroupTopicInput') updateGroupTopicInput: UpdateGroupTopicInput,
  ) {
    return this.groupTopicService.update(
      updateGroupTopicInput.id,
      updateGroupTopicInput,
    )
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
}
