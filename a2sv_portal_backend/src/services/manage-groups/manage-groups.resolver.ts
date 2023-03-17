import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Season } from '../../app/season/entities/season.entity'
import { BadRequestException, UseGuards } from '@nestjs/common'
import { PoliciesGuard } from '../../casl/policy/policy.guard'
import { CheckPolicies } from '../../casl/policy/policy.decorator'
import descriptions from '../../app/group/group.doc'
import { ManageGroupsService } from './manage-groups.service'
import { GroupAbilities } from '../../casl/handler/group-abilities.handler'
import { Group } from '../../app/group/entities/group.entity'
import { UpdateGroupInput } from '../../app/group/dto/update-group.input'
import { CreateGroupInput } from '../../app/group/dto/create-group.input'

@Resolver(() => Season)
export class ManageGroupsResolver {
  constructor(private readonly manageGroupsService: ManageGroupsService) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupAbilities.create)
  @Mutation(() => Group, { description: descriptions.createGroup })
  async createGroup(
    @Args('createGroupInput') createGroupInput: CreateGroupInput,
  ): Promise<Group> {
    try {
      return this.manageGroupsService.createGroup(createGroupInput)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Creating group failed!')
    }
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(GroupAbilities.update)
  @Mutation(() => Group, { description: descriptions.updateGroup })
  async updateGroup(
    @Args('updateGroupInput') updateGroupInput: UpdateGroupInput,
  ): Promise<Group> {
    try {
      return this.manageGroupsService.updateGroup(updateGroupInput)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Failed to update group!')
    }
  }
}
