import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { Group } from './entities/group.entity'
import { UserIncludeObject } from '../user/user.repository'

export const GroupIncludeObject = {
  users: {
    include: UserIncludeObject,
  },
}

@Injectable()
export class GroupRepository {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(data: Prisma.GroupCreateInput): Promise<Group> {
    return this.prismaService.group.create({
      data,
      include: GroupIncludeObject,
    })
  }

  async count(where?: Prisma.GroupWhereInput): Promise<number> {
    return this.prismaService.group.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.GroupWhereInput
    orderBy?: Prisma.GroupOrderByWithRelationInput
  }): Promise<Group[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.group.findMany({
      skip,
      take,
      where,
      orderBy,
      include: GroupIncludeObject,
    })
  }

  async findOne(where: Prisma.GroupWhereUniqueInput): Promise<Group> {
    return this.prismaService.group.findUnique({
      where,
      include: GroupIncludeObject,
    })
  }

  async update(params: {
    where: Prisma.GroupWhereUniqueInput
    data: Prisma.GroupUpdateInput
  }): Promise<Group> {
    const { where, data } = params
    return this.prismaService.group.update({
      data,
      where,
      include: GroupIncludeObject,
    })
  }

  async remove(where: Prisma.GroupWhereUniqueInput) {
    return this.prismaService.group.delete({ where })
  }
}
