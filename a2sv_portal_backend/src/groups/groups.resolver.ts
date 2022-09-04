import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Roles } from 'src/auth/auth.decorator'
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
  updateGroup(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateGroupInput') updateGroupInput: UpdateGroupInput,
  ) {
    return this.groupsService.updateGroup(id, updateGroupInput)
  }

  @Roles('ADMIN', 'HEAD_OF_ACADEMY')
  @Mutation(() => Group)
  deleteGroup(@Args('id', { type: () => Int }) id: number) {
    return this.groupsService.deleteGroup(id)
  }
}
