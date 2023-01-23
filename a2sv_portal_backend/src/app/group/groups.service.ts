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
  ) {}

  async createGroup({ headId, ...createGroupInput }: CreateGroupInput): Promise<Group> {
    // if headId is in the create input check if the user with the headId exists
    // if not return user not found if the user is there check if the user has been assigned
    // to another group
    const createData: Prisma.GroupCreateInput = { ...createGroupInput }
    if (headId) {
      const foundUser = await this.prismaService.user.findUnique({
        where: { id: headId },
        include: { headToGroup: true },
      })
      if (!foundUser) {
        throw new NotFoundException(`User with id ${headId} does not exist!`)
      }
      if (foundUser.headToGroup) {
        throw new Error(`User with id ${headId} is already assigned to another group!`)
      }
      createData.head = { connect: { id: headId } }
    }
    // TODO: if group is found in that name throw name has already been used error!
    return this.groupRepository.create({
      ...createData,
    })
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
      const getHead = await this.prismaService.user.findUnique({
        where: { id: headId },
        include: { headToGroup: true },
      })
      if (!getHead) {
        throw new NotFoundException(`User with id:${headId} not found`)
      }
      if (getHead.headToGroup && getHead.headToGroup.id !== groupId) {
        throw new Error(`User with id:${headId} is already assigned to another group!`)
      }
      newUpdates.head = {
        connect: { id: headId },
      }
      // if there are active season on the group the head on that active season should also change
      const groupSeason = await this.prismaService.groupSeason.findFirst({
        where: { groupId, isActive: true },
      })
      if (groupSeason) {
        const { groupId, seasonId } = groupSeason
        await this.prismaService.groupSeason.update({
          where: { groupId_seasonId: { groupId, seasonId } },
          data: {
            head: { connect: { id: headId } },
          },
        })
      }
    }
    return this.groupRepository.update({
      where: { id: groupId },
      data: newUpdates,
    })
  }

  // async groupsPagination(
  //   filterGroupInput: FilterGroupInput,
  //   {skip, take}: PaginationInfoInput,
  //   userPaginationInput: PaginationInfoInput = {take: 100, skip: 0},
  // ): Promise<GroupsPaginated> {
  //   const groupsCount = (
  //     await this.prismaService.group.findMany({
  //       where: filterGroupInput,
  //     })
  //   ).length
  //   const groups = await this.prismaService.group.findMany({
  //     where: filterGroupInput,
  //     skip,
  //     take,
  //     include: {
  //       users: {
  //         take: userPaginationInput.take,
  //         skip: userPaginationInput.skip,
  //       },
  //       head: true,
  //     },
  //   })
  //
  //   const groupsUsersPaginated: GroupsUsersPaginated[] = []
  //
  //   for (let i = 0; i < groups.length; i++) {
  //     const users = (
  //       await this.prismaService.group.findUnique({
  //         where: {
  //           id: groups[i].id,
  //         },
  //         include: {
  //           users: true,
  //         },
  //       })
  //     ).users
  //     groupsUsersPaginated.push({
  //       group: groups[i],
  //       pageInfo: {
  //         skip: userPaginationInput.skip,
  //         take: userPaginationInput.take,
  //         count: users.length,
  //       },
  //     })
  //   }
  //
  //   return {
  //     items: groupsUsersPaginated,
  //     pageInfo: {
  //       skip,
  //       take,
  //       count: groupsCount,
  //     },
  //   }
  // }

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
