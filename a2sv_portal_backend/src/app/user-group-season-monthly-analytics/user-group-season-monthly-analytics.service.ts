import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { UserTopicProblemStatusEnum } from '@prisma/client'
import { UserGroupSeasonId } from '../user-group-season/dto/create-group-user-season.input'
import { UserGroupSeasonMonthlyAnalyticInput } from './dto/user-group-season-monthly-analytic.input'

@Injectable()
export class UserGroupSeasonMonthlyAnalyticsService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async findAll() {
    return this.prismaService.userGroupSeasonMonthlyAnalytics.findMany({})
  }

  async findOne(userId: string, createdAt: Date) {
    return this.prismaService.userGroupSeasonMonthlyAnalytics.findUnique({
      where: {
        userId_createdAt: {
          userId,
          createdAt,
        },
      },
    })
  }

  async upsert({ userId, groupId, seasonId, createdAt }: UserGroupSeasonMonthlyAnalyticInput) {
    const userProblems = await this.prismaService.userGroupSeasonTopicProblem.findMany({
      where: {
        userId,
        groupId,
        seasonId,
        statusUpdatedAt: {
          gte: new Date(new Date(createdAt).getTime() - 30 * 24 * 60 * 60 * 1000),
          lte: createdAt,
        },
      },
    })
    return this.prismaService.userGroupSeasonMonthlyAnalytics.upsert({
      where: {
        userId_createdAt: {
          userId,
          createdAt,
        },
      },
      create: {
        userId,
        groupId,
        seasonId,
        solvedCount: userProblems.filter(up => up.status === UserTopicProblemStatusEnum.SOLVED)
          .length,
        wrongCount: userProblems.map(up => up.status === UserTopicProblemStatusEnum.SOLVED ? up.numberOfAttempts - 1 : up.numberOfAttempts).reduce((a, b) => a + b, 0),
      },
      update: {
        userId,
        groupId,
        seasonId,
        solvedCount: userProblems.filter(up => up.status === UserTopicProblemStatusEnum.SOLVED)
          .length,
        wrongCount: userProblems.map(up => up.status === UserTopicProblemStatusEnum.SOLVED ? up.numberOfAttempts - 1 : up.numberOfAttempts).reduce((a, b) => a + b, 0),
      },
    })
  }

  async remove(id: UserGroupSeasonId) {
    return `This action removes a #${id} userGroupSeasonMonthlyAnalytic`
  }
}
