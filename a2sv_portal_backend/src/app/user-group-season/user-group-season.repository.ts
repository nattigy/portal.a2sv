import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { UserGroupSeason } from './entities/user-group-season.entity'
import { PrismaService } from '../../prisma/prisma.service'
import { UserGroupSeasonTopicIncludeObject } from '../user-group-season-topic/user-group-season-topic.repository'
import { UserGroupSeasonContestIncludeObject } from '../user-group-season-contest/user-group-season-contest.repository'
import { UserIncludeObject } from '../user/user.repository'

export const UserGroupSeasonIncludeObject = {
  user: {
    include: UserIncludeObject,
  },
  userGroupSeasonTopics: {
    include: UserGroupSeasonTopicIncludeObject,
  },
  userGroupSeasonContests: {
    include: UserGroupSeasonContestIncludeObject,
  },
}

@Injectable()
export class UserGroupSeasonRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserGroupSeasonCreateInput): Promise<UserGroupSeason> {
    return this.prismaService.userGroupSeason.create({
      data,
      include: UserGroupSeasonIncludeObject,
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
      include: UserGroupSeasonIncludeObject,
    })
  }

  async findOne(where: Prisma.UserGroupSeasonWhereUniqueInput): Promise<UserGroupSeason> {
    return this.prismaService.userGroupSeason.findUnique({
      where,
      include: UserGroupSeasonIncludeObject,
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
      include: UserGroupSeasonIncludeObject,
    })
  }

  async upsert(params: {
    where: Prisma.UserGroupSeasonWhereUniqueInput
    data: Prisma.UserGroupSeasonUpdateInput
  }): Promise<UserGroupSeason> {
    const { where, data } = params
    return this.prismaService.userGroupSeason.upsert({
      where,
      create: {
        user: {
          connect: { id: where.userId_groupId_seasonId.userId },
        },
        groupSeason: {
          connect: {
            groupId_seasonId: {
              groupId: where.userId_groupId_seasonId.groupId,
              seasonId: where.userId_groupId_seasonId.seasonId,
            },
          },
        },
      },
      update: data,
      include: UserGroupSeasonIncludeObject,
    })
  }

  async remove(where: Prisma.UserGroupSeasonWhereUniqueInput) {
    return this.prismaService.userGroupSeason.delete({ where })
  }
}
