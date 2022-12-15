import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { UserGroupSeasonTopic } from './entities/user-group-season-topic.entity'

@Injectable()
export class UserGroupSeasonTopicRepository {
  constructor(private readonly prismaService: PrismaService) {}

  include = {
    userGroupSeasonTopicProblems: {
      include: {
        problem: { include: { tags: true } },
      }
    },
  }

  async create(data: Prisma.UserGroupSeasonTopicCreateInput): Promise<UserGroupSeasonTopic> {
    return this.prismaService.userGroupSeasonTopic.create({
      data,
      include: this.include,
    })
  }

  async count(where?: Prisma.UserGroupSeasonTopicWhereInput): Promise<number> {
    return this.prismaService.userGroupSeasonTopic.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.UserGroupSeasonTopicWhereInput
    orderBy?: Prisma.UserGroupSeasonTopicOrderByWithRelationInput
  }): Promise<UserGroupSeasonTopic[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.userGroupSeasonTopic.findMany({
      skip, take, where, orderBy,
      include: this.include,
    })
  }

  async findOne(where: Prisma.UserGroupSeasonTopicWhereUniqueInput): Promise<UserGroupSeasonTopic> {
    return this.prismaService.userGroupSeasonTopic.findUnique({
      where,
      include: this.include,
    })
  }

  async update(params: {
    where: Prisma.UserGroupSeasonTopicWhereUniqueInput
    data: Prisma.UserGroupSeasonTopicUpdateInput
  }): Promise<UserGroupSeasonTopic> {
    const { where, data } = params
    return this.prismaService.userGroupSeasonTopic.update({
      data,
      where,
      include: this.include,
    })
  }

  async remove(where: Prisma.UserGroupSeasonTopicWhereUniqueInput) {
    return this.prismaService.userGroupSeasonTopic.delete({ where })
  }
}
