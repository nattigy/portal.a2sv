import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { UserTopicProblemStatusEnum } from '@prisma/client'
import { UserGroupSeasonId } from '../user-group-season/dto/create-group-user-season.input'
import { UserGroupSeasonWeeklyAnalyticInput } from './dto/user-group-season-weekly-analytic.input'

@Injectable()
export class UserGroupSeasonWeeklyAnalyticsService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async findAll() {
    return this.prismaService.userGroupSeasonWeeklyAnalytics.findMany({})
  }

  async findOne(userId: string, createdAt: Date) {
    return this.prismaService.userGroupSeasonWeeklyAnalytics.findUnique({
      where: {
        userId_createdAt: {
          userId,
          createdAt,
        },
      },
    })
  }

  async upsert({ userId, groupId, seasonId, createdAt }: UserGroupSeasonWeeklyAnalyticInput) {
    const userProblems = await this.prismaService.userGroupSeasonTopicProblem.findMany({
      where: {
        userId,
        groupId,
        seasonId,
        statusUpdatedAt: {
          gte: new Date(new Date(createdAt).getTime() - 7 * 24 * 60 * 60 * 1000),
          lte: createdAt,
        },
      },
    })
    return this.prismaService.userGroupSeasonWeeklyAnalytics.upsert({
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
    return `This action removes a #${id} userGroupSeasonWeeklyAnalytic`
  }
}
