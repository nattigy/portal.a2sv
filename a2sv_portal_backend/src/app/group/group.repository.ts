import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { Group } from './entities/group.entity'

@Injectable()
export class GroupRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.GroupCreateInput): Promise<Group> {
    return this.prismaService.group.create({
      data,
      include: {
        users: {
          include: {
            userProfile: { include: { user: true } },
          },
        },
        head: true,
      },
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
      include: {
        users: {
          include: {
            userProfile: { include: { user: true } },
          },
        },
        head: true,
      },
    })
  }

  async findOne(where: Prisma.GroupWhereUniqueInput): Promise<Group> {
    return this.prismaService.group.findUnique({ where, include: { users: true, head: true } })
  }

  async update(params: {
    where: Prisma.GroupWhereUniqueInput
    data: Prisma.GroupUpdateInput
  }): Promise<Group> {
    const { where, data } = params
    return this.prismaService.group.update({
      data,
      where,
      include: {
        users: {
          include: {
            userProfile: { include: { user: true } },
          },
        },
        head: true,
      },
    })
  }

  async remove(where: Prisma.GroupWhereUniqueInput) {
    return this.prismaService.group.delete({ where })
  }
}
