import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class SeasonTopicRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.SeasonTopicCreateInput) {
    return this.prismaService.seasonTopic.create({ data })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.SeasonTopicWhereUniqueInput
    where?: Prisma.SeasonTopicWhereInput
    orderBy?: Prisma.SeasonTopicOrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.seasonTopic.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async findOne(where: Prisma.SeasonTopicWhereUniqueInput) {
    return this.prismaService.seasonTopic.findUnique({ where })
  }

  async update(params: {
    where: Prisma.SeasonTopicWhereUniqueInput
    data: Prisma.SeasonTopicUpdateInput
  }) {
    const { where, data } = params
    return this.prismaService.seasonTopic.update({ data, where })
  }

  async remove(where: Prisma.SeasonTopicWhereUniqueInput) {
    return this.prismaService.seasonTopic.delete({ where })
  }
}
