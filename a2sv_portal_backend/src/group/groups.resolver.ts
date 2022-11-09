import { UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { User } from 'src/user/entities/user.entity'
import { GroupAbilities } from '../casl/handler/group-abilities.handler'
import { CheckPolicies } from '../casl/policy/policy.decorator'
import { PoliciesGuard } from '../casl/policy/policy.guard'
import {
  GroupStatResponsePage,
  PaginationGroup,
} from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { Season } from '../season/entities/season.entity'
import { CreateGroupInput } from './dto/create-group.input'
import { GroupWhereInput } from './dto/find-group.input'
import { GroupStatResponse } from './dto/group-stat-response'
import { GroupsPaginated } from './dto/groups-return-dto'
import { UpdateGroupInput } from './dto/update-group.input'
import { Group } from './entities/group.entity'
import { GroupsService } from './groups.service'

@Resolver(() => Group)
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupAbilities.create)
  @Mutation(() => Group)
  async createGroup(
    @Args('createGroupInput') createGroupInput: CreateGroupInput,
  ): Promise<Group> {
    return this.groupsService.createGroup(createGroupInput)
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupAbilities.read)
  @Query(() => Group)
  async group(@Args('groupId') groupId: string): Promise<Group> {
    return this.groupsService.group(groupId)
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupAbilities.read)
  @Query(() => PaginationGroup)
  async groups(
    @Args('filter', { type: () => GroupWhereInput, nullable: true })
    where?: GroupWhereInput,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput: PaginationInfoInput = { skip: 0, take: 10 },
  ): Promise<PaginationGroup> {
    return this.groupsService.groups(pageInfoInput, where)
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupAbilities.read)
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

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupAbilities.update)
  @Mutation(() => Group)
  async updateGroup(
    @Args('updateGroupInput') updateGroupInput: UpdateGroupInput,
  ): Promise<Group> {
    return this.groupsService.updateGroup(updateGroupInput)
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupAbilities.read)
  @ResolveField(() => [Season], { nullable: 'itemsAndList' })
  async seasons(@Parent() group: Group): Promise<Season[] | null> {
    return group.seasons
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupAbilities.read)
  @ResolveField(() => User, { nullable: true })
  async head(@Parent() group: Group): Promise<User | null> {
    return group.head
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupAbilities.read)
  @Query(() => GroupStatResponsePage<GroupStatResponse>)
  async getGroupsStat(
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput?: PaginationInfoInput,
  ) {
    return this.groupsService.getGroupsStat(pageInfoInput)
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupAbilities.delete)
  @Mutation(() => Group)
  async deleteGroup(@Args('groupId') groupId: string) {
    return this.groupsService.deleteGroup(groupId)
  }
}
