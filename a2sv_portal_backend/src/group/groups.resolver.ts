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
import { User } from 'src/user/entities/user.entity'
import { CreateGroupInput } from './dto/create-group.input'
import { UpdateGroupInput } from './dto/update-group.input'
import { Group } from './entities/group.entity'
import { GroupsService, GroupWhereInput } from './groups.service'
import { GroupTopicSeason } from '../group-topic-season/entities/group-topic-season.entity'

@Resolver(() => Group)
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Roles('ADMIN', 'HEAD_OF_ACADEMY')
  @Mutation(() => Group)
  createGroup(@Args('createGroupInput') createGroupInput: CreateGroupInput) {
    return this.groupsService.createGroup(createGroupInput)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Query(() => [Group])
  groups(
    @Args('filter', { type: () => GroupWhereInput, nullable: true })
    where?: GroupWhereInput,
  ) {
    return this.groupsService.getGroups(where)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Query(() => Group)
  group(@Args('id', { type: () => Int }) id: number) {
    return this.groupsService.getGroupById(id)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Mutation(() => Group)
  updateGroup(@Args('updateGroupInput') updateGroupInput: UpdateGroupInput) {
    return this.groupsService.updateGroup(updateGroupInput)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Mutation(() => Group)
  deleteGroup(@Args('id', { type: () => Int }) id: number) {
    return this.groupsService.deleteGroup(id)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @ResolveField(() => [GroupTopicSeason], { nullable: 'itemsAndList' })
  seasonTopics(@Parent() group: Group): GroupTopicSeason[] | null {
    return group.seasonTopics
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @ResolveField(() => User, { nullable: true })
  head(@Parent() group: Group): User {
    return group.head
  }
}
