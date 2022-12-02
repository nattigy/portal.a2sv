import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class GroupSeasonTopicRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.GroupSeasonTopicCreateInput) {
    return this.prismaService.groupSeasonTopic.create({ data })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.GroupSeasonTopicWhereUniqueInput
    where?: Prisma.GroupSeasonTopicWhereInput
    orderBy?: Prisma.GroupSeasonTopicOrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.groupSeasonTopic.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async findOne(where: Prisma.GroupSeasonTopicWhereUniqueInput) {
    return this.prismaService.groupSeasonTopic.findUnique({ where })
  }

  async update(params: {
    where: Prisma.GroupSeasonTopicWhereUniqueInput
    data: Prisma.GroupSeasonTopicUpdateInput
  }) {
    const { where, data } = params
    return this.prismaService.groupSeasonTopic.update({ data, where })
  }

  async remove(where: Prisma.GroupSeasonTopicWhereUniqueInput) {
    return this.prismaService.groupSeasonTopic.delete({ where })
  }
}
