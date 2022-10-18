import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { GroupTopicSeasonProblemUserService } from './group-topic-season-problem-user.service'
import { GroupTopicSeasonProblemUser } from './entities/group-topic-season-problem-user.entity'
import { CreateGroupTopicSeasonProblemUserInput } from './dto/create-group-topic-season-problem-user.input'
import { UpdateGroupTopicSeasonProblemUserInput } from './dto/update-group-topic-season-problem-user.input'

@Resolver(() => GroupTopicSeasonProblemUser)
export class GroupTopicSeasonProblemUserResolver {
  constructor(
    private readonly groupTopicSeasonProblemUserService: GroupTopicSeasonProblemUserService,
  ) {}

  @Mutation(() => GroupTopicSeasonProblemUser)
  createGroupTopicSeasonProblemUser(
    @Args('createGroupTopicSeasonProblemUserInput')
    createGroupTopicSeasonProblemUserInput: CreateGroupTopicSeasonProblemUserInput,
  ) {
    return this.groupTopicSeasonProblemUserService.create(
      createGroupTopicSeasonProblemUserInput,
    )
  }

  @Query(() => [GroupTopicSeasonProblemUser], {
    name: 'groupTopicSeasonProblemUser',
  })
  findAll() {
    return this.groupTopicSeasonProblemUserService.findAll()
  }

  @Query(() => GroupTopicSeasonProblemUser, {
    name: 'groupTopicSeasonProblemUser',
  })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.groupTopicSeasonProblemUserService.findOne(id)
  }

  @Mutation(() => GroupTopicSeasonProblemUser)
  updateGroupTopicSeasonProblemUser(
    @Args('updateGroupTopicSeasonProblemUserInput')
    updateGroupTopicSeasonProblemUserInput: UpdateGroupTopicSeasonProblemUserInput,
  ) {
    return this.groupTopicSeasonProblemUserService.update(
      updateGroupTopicSeasonProblemUserInput,
    )
  }

  @Mutation(() => GroupTopicSeasonProblemUser)
  removeGroupTopicSeasonProblemUser(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.groupTopicSeasonProblemUserService.remove(id)
  }
}
