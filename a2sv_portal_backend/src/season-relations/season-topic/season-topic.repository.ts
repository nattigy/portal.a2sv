import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { SeasonTopic } from './entities/season-topic.entity'

@Injectable()
export class SeasonTopicRepository {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(data: Prisma.SeasonTopicCreateInput | Prisma.SeasonTopicUncheckedCreateInput): Promise<SeasonTopic> {
    return this.prismaService.seasonTopic.create({
      data,
      include: { season: true, topic: true },
    })
  }

  async count(where?: Prisma.SeasonTopicWhereInput): Promise<number> {
    return this.prismaService.seasonTopic.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.SeasonTopicWhereInput
    orderBy?: Prisma.SeasonTopicOrderByWithRelationInput
  }): Promise<SeasonTopic[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.seasonTopic.findMany({
      skip,
      take,
      where,
      orderBy,
      include: { season: true, topic: true },
    })
  }

  async findOne(where: Prisma.SeasonTopicWhereUniqueInput): Promise<SeasonTopic> {
    return this.prismaService.seasonTopic.findUnique({
      where,
      include: { season: true, topic: true },
    })
  }

  async update(params: {
    where: Prisma.SeasonTopicWhereUniqueInput
    data: Prisma.SeasonTopicUpdateInput
  }): Promise<SeasonTopic> {
    const { where, data } = params
    return this.prismaService.seasonTopic.update({
      data, where,
      include: { season: true, topic: true },
    })
  }

  async remove(where: Prisma.SeasonTopicWhereUniqueInput) {
    return this.prismaService.seasonTopic.delete({ where })
  }
}
