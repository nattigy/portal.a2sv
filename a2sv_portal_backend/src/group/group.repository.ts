import { Injectable, NotFoundException } from '@nestjs/common'
import { GroupStatResponsePage, PaginationGroup } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { PrismaService } from '../prisma/prisma.service'
import { CreateGroupInput } from './dto/create-group.input'
import { FilterGroupInput } from './dto/filter-group.input'
import { GroupStatResponse } from './dto/group-stat-response'
import { GroupsPaginated, GroupsUsersPaginated } from './dto/groups-return-dto'
import { UpdateGroupInput } from './dto/update-group.input'
import { Group } from './entities/group.entity'
import { Prisma } from '@prisma/client'

@Injectable()
export class GroupRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createGroupInput: CreateGroupInput): Promise<Group> {
    return this.prismaService.group.create({
      include: {
        users: true,
        head: true,
      },
      data: createGroupInput,
    })
  }

  async findOne(id: string): Promise<Group> {
    const group = await this.prismaService.group.findUnique({
      include: {
        users: true,
        head: true,
      },
    })
    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`)
    }
    return group
  }

  async findAll(
    filterGroupInput: FilterGroupInput,
    groupWhereUniqueInput: Prisma.GroupWhereUniqueInput,
    { skip, take }: PaginationInfoInput = { take: 50, skip: 0 },
  ): Promise<PaginationGroup> {
    const count = (
      await this.prismaService.group.findMany({
        where: groupWhereUniqueInput,
        select: {
          id: true,
        },
      })
    ).length
    const groups = await this.prismaService.group.findMany({
      skip,
      take,
      where: filterGroupInput,
      include: {
        users: true,
        head: true,
      },
    })
    return {
      items: groups,
      pageInfo: {
        skip,
        count,
        take,
      },
    }
  }

  async update({ id, ...updates }: UpdateGroupInput): Promise<Group> {
    return this.prismaService.group.update({
      where: { id },
      data: updates,
    })
  }

  async remove(id: string): Promise<number> {
    try {
      await this.prismaService.group.delete({ where: { id } })
    } catch (e) {
      console.log(`Fail to delete group with id ${id}`, ' : ', e)
      throw new Error(`Fail to delete group with id ${id}`)
    }
    return 1
  }
}
