import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GroupSeasonTopicService } from './group-season-topic.service';
import { GroupSeasonTopic } from './entities/group-season-topic.entity';
import { CreateGroupSeasonTopicInput } from './dto/create-group-season-topic.input';
import { UpdateGroupSeasonTopicInput } from './dto/update-group-season-topic.input';

@Resolver(() => GroupSeasonTopic)
export class GroupSeasonTopicResolver {
  constructor(private readonly groupSeasonTopicService: GroupSeasonTopicService) {}

  @Mutation(() => GroupSeasonTopic)
  createGroupSeasonTopic(@Args('createGroupSeasonTopicInput') createGroupSeasonTopicInput: CreateGroupSeasonTopicInput) {
    return this.groupSeasonTopicService.create(createGroupSeasonTopicInput);
  }

  @Query(() => [GroupSeasonTopic], { name: 'groupSeasonTopic' })
  findAll() {
    return this.groupSeasonTopicService.findAll();
  }

  @Query(() => GroupSeasonTopic, { name: 'groupSeasonTopic' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.groupSeasonTopicService.findOne(id);
  }

  @Mutation(() => GroupSeasonTopic)
  updateGroupSeasonTopic(@Args('updateGroupSeasonTopicInput') updateGroupSeasonTopicInput: UpdateGroupSeasonTopicInput) {
    return this.groupSeasonTopicService.update(updateGroupSeasonTopicInput.id, updateGroupSeasonTopicInput);
  }

  @Mutation(() => GroupSeasonTopic)
  removeGroupSeasonTopic(@Args('id', { type: () => Int }) id: number) {
    return this.groupSeasonTopicService.remove(id);
  }
}
