import {
  Args,
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
import { GroupsService } from './groups.service'
import { Season } from '../season/entities/season.entity'
import { GroupStatResponse } from './dto/group-stat-response'
import { GroupWhereInput } from './dto/find-group.input'
import { GroupsPaginated } from './dto/groups-return-dto'
import { PageInfoInput } from '../common/page/page-info.input'
import { GroupsPage, GroupStatResponsePage } from '../common/page/page-info'
import descriptions from './group.doc'

@Resolver(() => Group)
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Roles('ADMIN', 'HEAD_OF_ACADEMY')
  @Mutation(() => Group,{description:descriptions.createGroup})
  async createGroup(
    @Args('createGroupInput') createGroupInput: CreateGroupInput,
  ) {
    return this.groupsService.createGroup(createGroupInput)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Query(() => GroupsPage<Group>)
  async groups(
    @Args('filter', { type: () => GroupWhereInput, nullable: true })
    where?: GroupWhereInput,
    @Args('pageInfoInput', { type: () => PageInfoInput, nullable: true })
    pageInfoInput?: PageInfoInput,
  ) {
    return this.groupsService.getGroups(where, pageInfoInput)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Query(() => GroupsPaginated)
  async groupsPagination(
    @Args('filter', { type: () => GroupWhereInput, nullable: true })
    where?: GroupWhereInput,
    @Args('pageInfoInput', { type: () => PageInfoInput, nullable: true })
    pageInfoInput?: PageInfoInput,
    @Args('userPaginationInput', { type: () => PageInfoInput, nullable: true })
    userPaginationInput?: PageInfoInput,
  ): Promise<GroupsPaginated> {
    return this.groupsService.groupsPagination(
      where,
      pageInfoInput,
      userPaginationInput,
    )
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Query(() => Group,{description:descriptions.group})
  group(@Args('id', { type: () => String }) id: string) {
    return this.groupsService.getGroupById(id)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Mutation(() => Group,{description:descriptions.updateGroup})
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
  @Mutation(() => Group,{description:descriptions.deleteGroup})
  deleteGroup(@Args('id', { type: () => String }) id: string) {
    return this.groupsService.deleteGroup(id)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @ResolveField(() => [Season], { nullable: 'itemsAndList' })
  seasons(@Parent() group: Group): Season[] | null {
    return group.seasons
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

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Query(() => GroupStatResponsePage<GroupStatResponse>)
  async getGroupsStat(
    @Args('pageInfoInput', { type: () => PageInfoInput, nullable: true })
    pageInfoInput?: PageInfoInput,
  ) {
    return this.groupsService.getGroupsStat(pageInfoInput)
  }
}
