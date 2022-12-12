import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { UserSeason } from './entities/user-season.entity'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class UserSeasonRepository {
  include = {
    user: true,
    season: true,
    userSeasonTopics: {
      include: {
        seasonTopic: {
          include: {
            season: true,
            topic: true,
            seasonTopicProblems: {
              include: { problem: { include: { tags: true } } },
            },
          },
        },
        userSeasonTopicProblems: {
          include: { problem: { include: { tags: true } } },
        },
      },
    },
  }

  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserSeasonCreateInput): Promise<UserSeason> {
    return this.prismaService.userSeason.create({
      data,
      include: this.include,
    })
  }

  async count(where?: Prisma.UserSeasonWhereInput): Promise<number> {
    return this.prismaService.userSeason.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    groupId?: string
    where?: Prisma.UserSeasonWhereInput
    orderBy?: Prisma.UserSeasonOrderByWithRelationInput
  }): Promise<UserSeason[]> {
    const { skip, take, where, groupId, orderBy } = params
    return this.prismaService.userSeason.findMany({
      skip,
      take,
      where,
      orderBy,
      include: this.include,
    })
  }

  async findOne(where: Prisma.UserSeasonWhereUniqueInput): Promise<UserSeason> {
    return this.prismaService.userSeason.findUnique({
      where,
      include: this.include,
    })
  }

  async update(params: {
    where: Prisma.UserSeasonWhereUniqueInput
    data: Prisma.UserSeasonUpdateInput
  }): Promise<UserSeason> {
    const { where, data } = params
    return this.prismaService.userSeason.update({
      data,
      where,
      include: this.include,
    })
  }

  async remove(where: Prisma.UserSeasonWhereUniqueInput) {
    return this.prismaService.userSeason.delete({ where })
  }
}
