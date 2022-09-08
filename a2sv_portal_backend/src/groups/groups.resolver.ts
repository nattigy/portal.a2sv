import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Roles } from 'src/auth/auth.decorator'
import { GroupTopic } from 'src/group-topic/entities/group-topic.entity'
import { User } from 'src/user/entities/user.entity'
import { CreateGroupInput } from './dto/create-group.input'
import { UpdateGroupInput } from './dto/update-group.input'
import { Group } from './entities/group.entity'
import { GroupsService } from './groups.service'

@Resolver(() => Group)
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Roles('ADMIN', 'HEAD_OF_ACADEMY')
  @Mutation(() => Group)
  createGroup(@Args('createGroupInput') createGroupInput: CreateGroupInput) {
    return this.groupsService.createGroup(createGroupInput)
  }

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION', 'ASSISTANT')
  @Query(() => [Group])
  groups() {
    return this.groupsService.getGroups()
  }

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION', 'ASSISTANT')
  @Query(() => Group)
  group(@Args('id', { type: () => Int }) id: number) {
    return this.groupsService.getGroupById(id)
  }

  @Roles('ADMIN', 'HEAD_OF_ACADEMY')
  @Mutation(() => Group)
  updateGroup(@Args('updateGroupInput') updateGroupInput: UpdateGroupInput) {
    return this.groupsService.updateGroup(updateGroupInput)
  }

  @Roles('ADMIN', 'HEAD_OF_ACADEMY')
  @Mutation(() => Group)
  deleteGroup(@Args('id', { type: () => Int }) id: number) {
    return this.groupsService.deleteGroup(id)
  }

  @ResolveField(() => [GroupTopic], { nullable: 'itemsAndList' })
  topics(@Parent() group: Group): GroupTopic[] | null {
    return group.topics
  }

  @ResolveField(() => User, { nullable: true })
  head(@Parent() group: Group): User {
    return group.head
  }
}
