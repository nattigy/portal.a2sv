import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { Topic } from './entities/topic.entity'

@Injectable()
export class TopicRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.TopicCreateInput): Promise<Topic> {
    return this.prismaService.topic.create({ data, include: { resources: true } })
  }

  async count(where: Prisma.TopicWhereInput): Promise<number> {
    return this.prismaService.topic.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.TopicWhereInput
    orderBy?: Prisma.TopicOrderByWithRelationInput
  }): Promise<Topic[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.topic.findMany({
      skip,
      take,
      where,
      orderBy,
      include: { resources: true },
    })
  }

  async findOne(where: Prisma.TopicWhereUniqueInput): Promise<Topic> {
    return this.prismaService.topic.findUnique({ where, include: { resources: true } })
  }

  async update(params: {
    where: Prisma.TopicWhereUniqueInput
    data: Prisma.TopicUpdateInput
  }): Promise<Topic> {
    const { where, data } = params
    return this.prismaService.topic.update({ data, where, include: { resources: true } })
  }

  async remove(where: Prisma.TopicWhereUniqueInput) {
    return this.prismaService.topic.delete({ where })
  }
}
