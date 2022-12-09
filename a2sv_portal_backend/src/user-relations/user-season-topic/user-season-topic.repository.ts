import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { UserSeasonTopic } from './entities/user-season-topic.entity'

@Injectable()
export class UserSeasonTopicRepository {
  constructor(private readonly prismaService: PrismaService,
  ) {
  }

  include = {
    userSeasonTopicProblems: {
      include: {
        problem: { include: { tags: true } },
      },
    },
  }

  async create(data: Prisma.UserSeasonTopicCreateInput): Promise<UserSeasonTopic> {
    return this.prismaService.userSeasonTopic.create({
      data,
      include: this.include,
    })
  }

  async count(where?: Prisma.UserSeasonTopicWhereInput): Promise<number> {
    return this.prismaService.userSeasonTopic.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserSeasonTopicWhereUniqueInput
    where?: Prisma.UserSeasonTopicWhereInput
    orderBy?: Prisma.UserSeasonTopicOrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.userSeasonTopic.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: this.include,
    })
  }

  async findOne(where: Prisma.UserSeasonTopicWhereUniqueInput) {
    return this.prismaService.userSeasonTopic.findUnique({
      where,
      include: this.include,
    })
  }

  async update(params: {
    where: Prisma.UserSeasonTopicWhereUniqueInput
    data: Prisma.UserSeasonTopicUpdateInput
  }) {
    const { where, data } = params
    return this.prismaService.userSeasonTopic.update({
      data, where,
      include: this.include,
    })
  }

  async remove(where: Prisma.UserSeasonTopicWhereUniqueInput) {
    return this.prismaService.userSeasonTopic.delete({ where })
  }
}
