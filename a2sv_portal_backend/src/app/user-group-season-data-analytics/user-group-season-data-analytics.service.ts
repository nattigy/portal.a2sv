import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Cron, CronExpression } from '@nestjs/schedule'
import { StatusEnum, UserTopicProblemStatusEnum } from '@prisma/client'
import { UserGroupSeasonDailyAnalyticInput } from './dto/user-group-season-daily-analytic.input'
import { StudentWeeklyAnalytic } from './entities/weekly-data-analytic-entity'
import { StudentYearlyAnalytic } from './entities/yearly-data-analytic-entity'

@Injectable()
export class UserGroupSeasonDataAnalyticsService {
  constructor(private prismaService: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'Scheduler Populate user_data fields',
    timeZone: 'Africa/Addis_Ababa',
  })
  async populateData() {
    const currentDate = new Date() as any
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    const startDate = new Date(currentYear, 0, 1) as any
    const days = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24))
    const weeknubmer = Math.ceil(days / 7)

    const users = await this.prismaService.user.findMany({
      where: {
        status: StatusEnum.ACTIVE,
      },
    })
    if (!users) {
      throw new NotFoundException('NO USER IN THE DATABASE')
    }

    for (const user of users) {
      const activeSeason = await this.prismaService.groupSeason.findFirst({
        where: {
          groupId: user.groupId,
          isActive: true,
        },
      })
      const seasonId = activeSeason.seasonId
      await this.prismaService.userGroupSeasonDataAnalytics.upsert({
        where: {
          userId_groupId_seasonId_createdAt: {
            userId: user.id,
            groupId: user.groupId,
            seasonId,
            createdAt: new Date(),
          },
        },
        create: {
          userId: user.id,
          createdAt: new Date(),
          seasonId,
          groupId: user.groupId,
          year: currentYear,
          week: weeknubmer,
          month: currentMonth,
        },
        update: {
          userId: user.id,
          createdAt: new Date(),
          groupId: user.groupId,
          year: currentYear,
          week: weeknubmer,
        },
      })
    }
    console.log('===== populating user_stat ======')
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
    return this.prismaService.userGroupSeasonDataAnalytics.upsert({
      where: {
        userId_groupId_seasonId_createdAt: { userId, groupId, seasonId, createdAt },
      },
      create: {
        userId,
        groupId,
        seasonId,
        solvedCount: userProblems.filter(up => up.status === UserTopicProblemStatusEnum.SOLVED)
          .length,
        wrongCount: userProblems
          .map(up =>
            up.numberOfAttempts > 0
              ? up.status === UserTopicProblemStatusEnum.SOLVED
                ? up.numberOfAttempts - 1
                : up.numberOfAttempts
              : 1,
          )
          .reduce((a, b) => a + b, 0),
        month: new Date().getMonth(),
        week: 0,
        year: new Date().getFullYear(),
      },
      update: {
        userId,
        groupId,
        seasonId,
        solvedCount: userProblems.filter(up => up.status === UserTopicProblemStatusEnum.SOLVED)
          .length,
        wrongCount: userProblems
          .map(up =>
            up.numberOfAttempts > 0
              ? up.status === UserTopicProblemStatusEnum.SOLVED
                ? up.numberOfAttempts - 1
                : up.numberOfAttempts
              : 1,
          )
          .reduce((a, b) => a + b, 0),
      },
    })
  }

  async yearlyUserStat(userId: string, startDate?: Date, endDate?: Date) {
    const date = new Date()
    const startdate = startDate
      ? new Date(startDate)
      : new Date(`${date.getFullYear() - 1}-${date.getMonth()}-${date.getDate()}`)
    const enddate = endDate ? new Date(endDate) : new Date()
    const yearlystat = await this.prismaService.userGroupSeasonDataAnalytics.groupBy({
      by: ['year'],
      where: {
        userId,
        createdAt: {
          lte: enddate,
          gte: startdate,
        },
      },

      _sum: {
        solvedCount: true,
        wrongCount: true,
      },
      orderBy: {
        year: 'asc',
      },
    })
    return yearlystat as unknown as StudentYearlyAnalytic
  }

  async weeklyUserStart(userId: string, startDate?: Date, endDate?: Date) {
    const date = new Date()
    const startdate = startDate
      ? new Date(startDate)
      : new Date(`${date.getFullYear() - 1}-${date.getMonth()}-${date.getDate()}`)
    const enddate = endDate ? new Date(endDate) : new Date()

    const weeklystat = await this.prismaService.userGroupSeasonDataAnalytics.groupBy({
      by: ['week'],
      where: {
        userId,
        createdAt: {
          lte: enddate,
          gte: startdate,
        },
        // seasonId,
      },
      _sum: {
        solvedCount: true,
        wrongCount: true,
      },
      orderBy: {
        week: 'asc',
      },
    })
    return weeklystat as unknown as StudentWeeklyAnalytic
  }

  async monthlyUserStart(userId: string, startDate?: Date, endDate?: Date) {
    const date = new Date()
    const startdate = startDate
      ? new Date(startDate)
      : new Date(`${date.getFullYear() - 1}-${date.getMonth()}-${date.getDate()}`)
    const enddate = endDate ? new Date(endDate) : new Date()

    const monthlystat = await this.prismaService.userGroupSeasonDataAnalytics.groupBy({
      by: ['month'],
      where: {
        userId,
        createdAt: {
          lte: enddate,
          gte: startdate,
        },
        // seasonId,
      },
      _sum: {
        solvedCount: true,
        wrongCount: true,
      },
      orderBy: {
        month: 'asc',
      },
    })

    return monthlystat as unknown as StudentWeeklyAnalytic
  }

  async userStat(userId: string, startDate?: Date, endDate?: Date) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (!user) {
      throw new NotFoundException('User Not Found With this ID')
    }

    const enddate = endDate ? new Date(endDate) : new Date()
    const date = new Date()
    const startdate = startDate
      ? new Date(startDate)
      : new Date(`${date.getFullYear() - 1}-${date.getMonth()}-${date.getDate()}`)

    const userdailystat = await this.prismaService.userGroupSeasonDataAnalytics.findMany({
      where: {
        userGroupSeason: {
          userId,
          groupId: user.groupId,
        },
        createdAt: {
          lte: enddate,
          gte: startdate,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return userdailystat
  }
}
