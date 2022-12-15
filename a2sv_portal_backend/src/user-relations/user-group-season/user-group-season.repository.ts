import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { UserGroupSeason } from './entities/user-group-season.entity'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class UserGroupSeasonRepository {
  include = {
    user: true,
    userGroupSeasonTopics: {
      include: {
        userGroupSeasonTopicProblems: {
          include: {
            problem: { include: { tags: true } },
          },
        },
      },
    },
  }

  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserGroupSeasonCreateInput): Promise<UserGroupSeason> {
    return this.prismaService.userGroupSeason.create({
      data,
      include: this.include,
    })
  }

  async count(where?: Prisma.UserGroupSeasonWhereInput): Promise<number> {
    return this.prismaService.userGroupSeason.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.UserGroupSeasonWhereInput
    orderBy?: Prisma.UserGroupSeasonOrderByWithRelationInput
  }): Promise<UserGroupSeason[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.userGroupSeason.findMany({
      skip,
      take,
      where,
      orderBy,
      include: this.include,
    })
  }

  async findOne(where: Prisma.UserGroupSeasonWhereUniqueInput): Promise<UserGroupSeason> {
    return this.prismaService.userGroupSeason.findUnique({
      where,
      include: this.include,
    })
  }

  async update(params: {
    where: Prisma.UserGroupSeasonWhereUniqueInput
    data: Prisma.UserGroupSeasonUpdateInput
  }): Promise<UserGroupSeason> {
    const { where, data } = params
    return this.prismaService.userGroupSeason.update({
      data,
      where,
      include: this.include,
    })
  }

  async remove(where: Prisma.UserGroupSeasonWhereUniqueInput) {
    return this.prismaService.userGroupSeason.delete({ where })
  }
}
