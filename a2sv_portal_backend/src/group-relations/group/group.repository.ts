import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { Group } from './entities/group.entity'

@Injectable()
export class GroupRepository {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(data: Prisma.GroupCreateInput | Prisma.GroupUncheckedCreateInput): Promise<Group> {
    return this.prismaService.group.create({ data })
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
    })
  }

  async findOne(where: Prisma.GroupWhereUniqueInput): Promise<Group> {
    return this.prismaService.group.findUnique({ where })
  }

  async update(params: {
    where: Prisma.GroupWhereUniqueInput
    data: Prisma.GroupUpdateInput | Prisma.GroupUncheckedUpdateInput
  }): Promise<Group> {
    const { where, data } = params
    return this.prismaService.group.update({ data, where })
  }

  async remove(where: Prisma.GroupWhereUniqueInput) {
    return this.prismaService.group.delete({ where })
  }
}
