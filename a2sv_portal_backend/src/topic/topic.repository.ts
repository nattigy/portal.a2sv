import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class TopicRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.TopicCreateInput) {
    return this.prismaService.topic.create({ data })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.TopicWhereUniqueInput
    where?: Prisma.TopicWhereInput
    orderBy?: Prisma.TopicOrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.topic.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async findOne(where: Prisma.TopicWhereUniqueInput) {
    return this.prismaService.topic.findUnique({ where })
  }

  async update(params: {
    where: Prisma.TopicWhereUniqueInput
    data: Prisma.TopicUpdateInput
  }) {
    const { where, data } = params
    return this.prismaService.topic.update({ data, where })
  }

  async remove(where: Prisma.TopicWhereUniqueInput) {
    return this.prismaService.topic.delete({ where })
  }
}
