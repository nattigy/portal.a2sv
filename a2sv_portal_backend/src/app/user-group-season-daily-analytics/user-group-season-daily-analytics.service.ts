import { Injectable } from '@nestjs/common'
import { UserGroupSeasonDailyAnalyticInput } from './dto/user-group-season-daily-analytic.input'
import { UserGroupSeasonId } from '../user-group-season/dto/create-group-user-season.input'
import { PrismaService } from '../../prisma/prisma.service'
import { UserTopicProblemStatusEnum } from '@prisma/client'

@Injectable()
export class UserGroupSeasonDailyAnalyticsService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {
  }

  async findAll() {
    return this.prismaService.userGroupSeasonDailyAnalytics.findMany({})
  }

  async findOne(userId: string, createdAt: Date) {
    return this.prismaService.userGroupSeasonDailyAnalytics.findUnique({
      where: {
        userId_createdAt: {
          userId,
          createdAt,
        },
      },
    })
  }

  async upsert({ userId, groupId, seasonId, createdAt }: UserGroupSeasonDailyAnalyticInput) {
    const userProblems = await this.prismaService.userGroupSeasonTopicProblem.findMany({
      where: {
        userId,
        groupId,
        seasonId,
        statusUpdatedAt: createdAt,
      },
    })
    // return this.prismaService.userGroupSeasonDailyAnalytics.upsert({
    //   where: {
    //     userId_createdAt: {
    //       userId,
    //       createdAt,
    //     },
    //   },
    //   create: {
    //     userId,
    //     groupId,
    //     seasonId,
    //     solvedCount: userProblems.filter(up => up.status === UserTopicProblemStatusEnum.SOLVED)
    //       .length,
    //     wrongCount: userProblems.map(up => up.status === UserTopicProblemStatusEnum.SOLVED ? up.numberOfAttempts - 1 : up.numberOfAttempts).reduce((a, b) => a + b, 0),
    //   },
    //   update: {
    //     userId,
    //     groupId,
    //     seasonId,
    //     solvedCount: userProblems.filter(up => up.status === UserTopicProblemStatusEnum.SOLVED)
    //       .length,
    //     wrongCount: userProblems.map(up => up.status === UserTopicProblemStatusEnum.SOLVED ? up.numberOfAttempts - 1 : up.numberOfAttempts).reduce((a, b) => a + b, 0),
    //   },
    // })
  }

  async remove(id: UserGroupSeasonId) {
    return `This action removes a #${id} userGroupSeasonDailyAnalytic`
  }
}
