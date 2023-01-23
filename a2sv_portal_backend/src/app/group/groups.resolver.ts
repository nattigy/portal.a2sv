import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PaginationGroup } from '../../common/page/pagination-info'
import { PaginationInput } from '../../common/page/pagination.input'
import { CreateGroupInput } from './dto/create-group.input'
import { FilterGroupInput } from './dto/filter-group.input'
import { UpdateGroupInput } from './dto/update-group.input'
import { Group } from './entities/group.entity'
import { GroupsService } from './groups.service'
import descriptions from './group.doc'
import { GroupAbilities } from '../../casl/handler/group-abilities.handler'
import { CheckPolicies } from '../../casl/policy/policy.decorator'
import { UseGuards } from '@nestjs/common'
import { PoliciesGuard } from '../../casl/policy/policy.guard'

@Resolver(() => Group)
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupAbilities.create)
  @Mutation(() => Group, { description: descriptions.createGroup })
  async createGroup(
    @Args('createGroupInput') createGroupInput: CreateGroupInput,
  ): Promise<Group> {
    return this.groupsService.createGroup(createGroupInput)
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupAbilities.read)
  @Query(() => Group, { description: descriptions.group })
  async group(@Args('groupId') groupId: string): Promise<Group> {
    return this.groupsService.group(groupId)
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupAbilities.read)
  @Query(() => PaginationGroup)
  async groups(
    @Args('filterGroupInput', { nullable: true }) filterGroupInput?: FilterGroupInput,
    @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  ): Promise<PaginationGroup> {
    return this.groupsService.groups(filterGroupInput, paginationInput)
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupAbilities.update)
  @Mutation(() => Group, { description: descriptions.updateGroup })
  async updateGroup(
    @Args('updateGroupInput') updateGroupInput: UpdateGroupInput,
  ): Promise<Group> {
    return this.groupsService.updateGroup(updateGroupInput)
  }

  // @UseGuards(PoliciesGuard)
  // @CheckPolicies(GroupAbilities.read)
  // @Query(() => GroupsPaginated)
  // async groupsPagination(
  //   @Args('filterGroupInput', { type: () => FilterGroupInput, nullable: true })
  //   filterGroupInput?: FilterGroupInput,
  //   @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
  //   pageInfoInput?: PaginationInfoInput,
  //   @Args('userPaginationInput', { type: () => PaginationInfoInput, nullable: true })
  //   userPaginationInput?: PaginationInfoInput,
  // ): Promise<GroupsPaginated> {
  //   return this.groupsService.groupsPagination(
  //     filterGroupInput,
  //     pageInfoInput,
  //     userPaginationInput,
  //   )
  // }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupAbilities.delete)
  @Mutation(() => Int, { description: descriptions.deleteGroup })
  async removeGroup(@Args('groupId') groupId: string): Promise<number> {
    return this.groupsService.removeGroup(groupId)
  }
}
