import { Injectable, NotFoundException } from '@nestjs/common'
import { PaginationGroup } from '../../common/page/pagination-info'
import { PaginationInput } from '../../common/page/pagination.input'
import { CreateGroupInput } from './dto/create-group.input'
import { FilterGroupInput } from './dto/filter-group.input'
import { UpdateGroupInput } from './dto/update-group.input'
import { Group } from './entities/group.entity'
import { GroupRepository } from './group.repository'

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  async createGroup(createGroupInput: CreateGroupInput): Promise<Group> {
    return this.groupRepository.create(createGroupInput)
  }

  async group(groupId: string): Promise<Group> {
    const group = await this.groupRepository.findOne({ id: groupId })
    if (!group) {
      throw new NotFoundException(`Group with id ${groupId} not found`)
    }
    return group
  }

  async groups(
    filterGroupInput: FilterGroupInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationGroup> {
    const count = await this.groupRepository.count(filterGroupInput)
    const groups = await this.groupRepository.findAll({
      skip,
      take,
      where: filterGroupInput,
    })
    return {
      items: groups,
      pageInfo: { skip, count, take },
    }
  }

  async updateGroup({ groupId, ...updates }: UpdateGroupInput): Promise<Group> {
    return this.groupRepository.update({
      where: { id: groupId },
      data: updates,
    })
  }

  async removeGroup(id: string): Promise<number> {
    try {
      await this.groupRepository.remove({ id })
    } catch (e) {
      console.log(`Fail to delete group with id ${id}`, ' : ', e)
      throw new Error(`Fail to delete group with id ${id}`)
    }
    return 1
  }
}
