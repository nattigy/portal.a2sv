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

  async createGroup(createGroupInput: CreateGroupInput): Promise<Group> {
    return this.groupRepository.create({
      ...createGroupInput,
      headId: createGroupInput.headId,
      head: {
        connect: { id: createGroupInput.headId },
      },
    })
  }

  async group(id: string): Promise<Group> {
    return this.groupRepository.findOne({ id })
  }

  async groups(
    filterGroupInput: FilterGroupInput,
    { skip, take }: PaginationInput = { take: 50, skip: 0 },
  ): Promise<PaginationGroup> {
    const count = await this.groupRepository.count(filterGroupInput)
    const groups = await this.groupRepository.findAll({
      skip, take,
      where: filterGroupInput,
    })
    return {
      items: groups,
      pageInfo: { skip, count, take },
    }
  }

  async updateGroup({ groupId, ...updates }: UpdateGroupInput): Promise<Group> {
    const newUpdates: Prisma.GroupUpdateInput | Prisma.GroupUncheckedUpdateInput = { ...updates, head: null }
    if (updates.headId) {
      const getHead = await this.prismaService.user.findUnique({ where: { id: updates.headId } })
      if (!getHead) {
        throw new NotFoundException(`User with id:${updates.headId} not found`)
      }
      // newUpdates.headId = updates.headId
      newUpdates.head = {
        connect: { id: updates.headId },
      }
      const groupSeason = await this.prismaService.groupSeason.findFirst({
        where: { groupId: groupId, isActive: true },
      })
      if (groupSeason) {
        const { groupId, seasonId } = groupSeason
        await this.prismaService.groupSeason.update({
          where: { groupId_seasonId: { groupId, seasonId } },
          data: {
            headId: updates.headId,
            // head: {
            //   connect: {
            //     id: updates.headId
            //   }
            // }
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
