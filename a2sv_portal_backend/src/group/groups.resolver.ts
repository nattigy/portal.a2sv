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
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import {
  GroupStatResponsePage,
  PaginationGroup,
} from '../common/page/pagination-info'

@Resolver(() => Group)
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Roles('ADMIN', 'HEAD_OF_ACADEMY')
  @Mutation(() => Group)
  async createGroup(
    @Args('createGroupInput') createGroupInput: CreateGroupInput,
  ): Promise<Group> {
    return this.groupsService.createGroup(createGroupInput)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Query(() => Group)
  async group(@Args('groupId') groupId: string): Promise<Group> {
    return this.groupsService.group(groupId)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Query(() => PaginationGroup)
  async groups(
    @Args('filter', { type: () => GroupWhereInput, nullable: true })
    where?: GroupWhereInput,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput: PaginationInfoInput = { skip: 0, take: 10 },
  ): Promise<PaginationGroup> {
    return this.groupsService.groups(pageInfoInput, where)
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
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput?: PaginationInfoInput,
    @Args('userPaginationInput', {
      type: () => PaginationInfoInput,
      nullable: true,
    })
    userPaginationInput?: PaginationInfoInput,
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
  @Mutation(() => Group)
  async updateGroup(
    @Args('updateGroupInput') updateGroupInput: UpdateGroupInput,
  ): Promise<Group> {
    return this.groupsService.updateGroup(updateGroupInput)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @ResolveField(() => [Season], { nullable: 'itemsAndList' })
  async seasons(@Parent() group: Group): Promise<Season[] | null> {
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
  async head(@Parent() group: Group): Promise<User | null> {
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
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput?: PaginationInfoInput,
  ) {
    return this.groupsService.getGroupsStat(pageInfoInput)
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Mutation(() => Group)
  async deleteGroup(@Args('groupId') groupId: string) {
    return this.groupsService.deleteGroup(groupId)
  }
}
