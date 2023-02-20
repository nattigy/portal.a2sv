
import { Prisma } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { SeasonTopicResource } from './entities/season-topic-resource.entity'

@Injectable()
export class SeasonTopicResourceRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: Prisma.SeasonTopicResourceCreateInput): Promise<SeasonTopicResource> {
    return this.prismaService.seasonTopicResource.create({ data })
  }
  async count(where?: Prisma.SeasonTopicResourceWhereInput): Promise<number> {
    return this.prismaService.seasonTopicResource.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.SeasonTopicResourceWhereInput
    orderBy?: Prisma.SeasonTopicResourceOrderByWithRelationInput
  }): Promise<SeasonTopicResource[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.seasonTopicResource.findMany({
      skip,
      take,
      where,
      orderBy,
    })
  }
  async findOne(where: Prisma.SeasonTopicResourceWhereInput) {
    return this.prismaService.seasonTopicResource.findFirst({
      where,
    })
  }
  async update(params: {
    where: Prisma.SeasonTopicResourceWhereUniqueInput
    data: Prisma.SeasonTopicResourceUpdateInput
  }): Promise<SeasonTopicResource> {
    const { where, data } = params
    return this.prismaService.seasonTopicResource.update({ data, where })
  }

  async remove(where: Prisma.SeasonTopicResourceWhereUniqueInput) {
    return this.prismaService.seasonTopicResource.delete({ where })
  }
}
