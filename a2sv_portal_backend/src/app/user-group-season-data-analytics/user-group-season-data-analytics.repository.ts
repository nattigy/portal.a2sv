import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { UserGroupSeasonDataAnalytics } from './entities/user-group-season-data-analytics'

@Injectable()
export class UserGroupSeasonDataAnalyticsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: Prisma.UserGroupSeasonDataAnalyticsCreateInput,
  ): Promise<UserGroupSeasonDataAnalytics> {
    return this.prismaService.userGroupSeasonDataAnalytics.create({
      data,
    })
  }

  async count(where?: Prisma.UserGroupSeasonDataAnalyticsWhereInput): Promise<number> {
    return this.prismaService.userGroupSeasonDataAnalytics.count({ where })
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: Prisma.UserGroupSeasonDataAnalyticsWhereInput
    orderBy?: Prisma.UserGroupSeasonDataAnalyticsOrderByWithRelationInput
  }): Promise<UserGroupSeasonDataAnalytics[]> {
    const { skip, take, where, orderBy } = params
    return this.prismaService.userGroupSeasonDataAnalytics.findMany({
      skip,
      take,
      where,
      orderBy,
    })
  }

  async findOne(
    where: Prisma.UserGroupSeasonDataAnalyticsWhereUniqueInput,
  ): Promise<UserGroupSeasonDataAnalytics> {
    return this.prismaService.userGroupSeasonDataAnalytics.findUnique({
      where,
    })
  }

  async update(params: {
    where: Prisma.UserGroupSeasonDataAnalyticsWhereUniqueInput
    data: Prisma.UserGroupSeasonDataAnalyticsUpdateInput
  }): Promise<UserGroupSeasonDataAnalytics> {
    const { where, data } = params
    return this.prismaService.userGroupSeasonDataAnalytics.update({
      data,
      where,
    })
  }

  async remove(where: Prisma.UserGroupSeasonDataAnalyticsWhereUniqueInput) {
    return this.prismaService.userGroupSeasonDataAnalytics.delete({ where })
  }
}
