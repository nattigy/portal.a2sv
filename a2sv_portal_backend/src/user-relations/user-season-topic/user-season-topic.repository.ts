import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class UserSeasonTopicRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserTopicCreateInput) {
    return this.prismaService.userTopic.create({ data })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserTopicWhereUniqueInput
    where?: Prisma.UserTopicWhereInput
    orderBy?: Prisma.UserTopicOrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.userTopic.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async findOne(where: Prisma.UserTopicWhereUniqueInput) {
    return this.prismaService.userTopic.findUnique({ where })
  }

  async update(params: {
    where: Prisma.UserTopicWhereUniqueInput
    data: Prisma.UserTopicUpdateInput
  }) {
    const { where, data } = params
    return this.prismaService.userTopic.update({ data, where })
  }

  async remove(where: Prisma.UserTopicWhereUniqueInput) {
    return this.prismaService.userTopic.delete({ where })
  }
}
