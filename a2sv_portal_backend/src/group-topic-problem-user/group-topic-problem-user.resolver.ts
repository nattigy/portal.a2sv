import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { GroupTopicProblemUserService } from './group-topic-problem-user.service'
import { GroupTopicProblemUser } from './entities/group-topic-problem-user.entity'
import { CreateGroupTopicProblemUserInput } from './dto/create-group-topic-problem-user.input'
import { UpdateGroupTopicProblemUserInput } from './dto/update-group-topic-problem-user.input'

@Resolver(() => GroupTopicProblemUser)
export class GroupTopicProblemUserResolver {
  constructor(
    private readonly groupTopicProblemUserService: GroupTopicProblemUserService,
  ) {}

  @Mutation(() => GroupTopicProblemUser)
  createGroupTopicProblemUser(
    @Args('createGroupTopicProblemUserInput')
    createGroupTopicProblemUserInput: CreateGroupTopicProblemUserInput,
  ) {
    return this.groupTopicProblemUserService.create(
      createGroupTopicProblemUserInput,
    )
  }

  @Query(() => [GroupTopicProblemUser], { name: 'groupTopicProblemUser' })
  findAll() {
    return this.groupTopicProblemUserService.findAll()
  }

  @Query(() => GroupTopicProblemUser, { name: 'groupTopicProblemUser' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.groupTopicProblemUserService.findOne(id)
  }

  @Mutation(() => GroupTopicProblemUser)
  updateGroupTopicProblemUser(
    @Args('updateGroupTopicProblemUserInput')
    updateGroupTopicProblemUserInput: UpdateGroupTopicProblemUserInput,
  ) {
    return this.groupTopicProblemUserService.update(
      updateGroupTopicProblemUserInput,
    )
  }

  @Mutation(() => GroupTopicProblemUser)
  removeGroupTopicProblemUser(@Args('id', { type: () => Int }) id: number) {
    return this.groupTopicProblemUserService.remove(id)
  }
}
