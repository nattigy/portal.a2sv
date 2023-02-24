import { Injectable, NotFoundException } from '@nestjs/common'
import { PaginationGroup } from '../../common/page/pagination-info'
import { PaginationInput } from '../../common/page/pagination.input'
import { CreateGroupInput } from './dto/create-group.input'
import { FilterGroupInput } from './dto/filter-group.input'
import { UpdateGroupInput } from './dto/update-group.input'
import { Group } from './entities/group.entity'
import { GroupRepository } from './group.repository'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class GroupsService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly prismaService: PrismaService,
  ) {
  }

  async createGroup({ headId, ...createGroupInput }: CreateGroupInput): Promise<Group> {
    /** if headId is in the create input check if the user with the headId exists
     if not return user not found if the user is there check if the user has been assigned
     to another group
     */
    const createData: Prisma.GroupCreateInput = { ...createGroupInput }
    // TODO: if group is found in that name throw name has already been used error!
    const group = await this.groupRepository.create({
      ...createData,
    })
    if (headId) {
      const foundUser = await this.prismaService.user.findUnique({
        where: { id: headId },
      })
      if (!foundUser) {
        throw new NotFoundException(`User with id ${headId} does not exist!`)
      }
      // if (foundUser.headToGroup) {
      //   throw new Error(`User with id ${headId} is already assigned to another group!`)
      // }
      await this.prismaService.groupHead.upsert({
        where: { groupId_headId: { groupId: group.id, headId: foundUser.id } },
        create: { groupId: group.id, headId: foundUser.id },
        update: {},
      })
    }
    return group
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

  async updateGroup({ groupId, headId, ...updates }: UpdateGroupInput): Promise<Group> {
    // check if group with this Id exists and if it doesn't return
    // "group with this Id doesn't" exists error
    const foundGroup = await this.prismaService.group.findUnique({ where: { id: groupId } })
    if (!foundGroup) {
      throw new NotFoundException(`Group with id ${groupId} not found`)
    }

    const newUpdates: Prisma.GroupUpdateInput = { ...updates }
    if (headId) {
      const foundUser = await this.prismaService.user.findUnique({
        where: { id: headId },
      })
      if (!foundUser) {
        throw new NotFoundException(`User with id ${headId} does not exist!`)
      }
      // if there are active season on the group the head on that active season should also change
      const groupSeason = await this.prismaService.groupSeason.findFirst({
        where: { groupId, isActive: true },
      })
      if (groupSeason) {
        const { groupId, seasonId } = groupSeason
        await this.prismaService.groupSeasonHead.upsert({
          where: {
            groupId_seasonId_headId: {
              groupId, seasonId, headId: foundUser.id,
            },
          },
          create: { groupId, seasonId, headId: foundUser.id },
          update: {},
        })
      }
      await this.prismaService.groupHead.upsert({
        where: { groupId_headId: { groupId: foundGroup.id, headId: foundUser.id } },
        create: { groupId: foundGroup.id, headId: foundUser.id },
        update: {},
      })
    }
    return this.groupRepository.update({
      where: { id: groupId },
      data: newUpdates,
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