import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { User } from 'src/user/entities/user.entity'
import { GroupAbilities } from '../casl/handler/group-abilities.handler'
import { CheckPolicies } from '../casl/policy/policy.decorator'
import { PoliciesGuard } from '../casl/policy/policy.guard'
import { GroupStatResponsePage, PaginationOutput } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { Season } from '../season/entities/season.entity'
import { CreateGroupInput } from './dto/create-group.input'
import { FilterGroupInput } from './dto/filter-group.input'
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
    return this.groupsService.create(createGroupInput)
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupAbilities.read)
  @Query(() => Group)
  async group(@Args('groupId') groupId: string): Promise<Group> {
    return this.groupsService.findOne(groupId)
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupAbilities.read)
  @Query(() => PaginationOutput<Group>)
  async groups(
    @Args('filterGroupInput', { type: () => FilterGroupInput, nullable: true })
    filterGroupInput?: FilterGroupInput,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput?: PaginationInfoInput,
  ): Promise<PaginationOutput<Group>> {
    return this.groupsService.findAll(filterGroupInput, pageInfoInput)
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupAbilities.read)
  @Query(() => GroupsPaginated)
  async groupsPagination(
    @Args('filterGroupInput', { type: () => FilterGroupInput, nullable: true })
    filterGroupInput?: FilterGroupInput,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput?: PaginationInfoInput,
    @Args('userPaginationInput', {
      type: () => PaginationInfoInput,
      nullable: true,
    })
    userPaginationInput?: PaginationInfoInput,
  ): Promise<GroupsPaginated> {
    return this.groupsService.groupsPagination(
      filterGroupInput,
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
    return this.groupsService.update(updateGroupInput)
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
  async groupsStat(
    @Args('filterGroupInput', { type: () => FilterGroupInput, nullable: true })
    filterGroupInput?: FilterGroupInput,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput?: PaginationInfoInput,
  ) {
    return this.groupsService.groupsStat(filterGroupInput, pageInfoInput)
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupAbilities.read)
  @Query(() => GroupStatResponse)
  async groupStat(@Args('groupId') groupId: string) {
    return this.groupsService.groupStat(groupId)
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupAbilities.delete)
  @Mutation(() => Group)
  async deleteGroup(@Args('groupId') groupId: string) {
    return this.groupsService.deleteGroup(groupId)
  }
}
