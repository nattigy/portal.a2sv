import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Cron, CronExpression } from '@nestjs/schedule'
import { StatusEnum, UserTopicProblemStatusEnum } from '@prisma/client'
import { UserGroupSeasonDailyAnalyticInput } from './dto/user-group-season-daily-analytic.input'
import { StudentWeeklyAnalytic } from './entities/weekly-data-analytic-entity'
import { StudentYearlyAnalytic } from './entities/yearly-data-analytic-entity'

@Injectable()
export class StudentDataAnalyticsService {
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
      const activeSeason = await this.prismaService.groupSeason.findMany({
        where: {
          groupId: user.groupId,
          isActive: true,
        },
      })
      const seasonId = activeSeason[0].seasonId
      await this.prismaService.userGroupSeasonDataAnalytics.upsert({
        where: {
          userId_createdAt: {
            userId: user.id,
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
        wrongCount: userProblems
          .map(up =>
            up.status === UserTopicProblemStatusEnum.SOLVED
              ? up.numberOfAttempts - 1
              : up.numberOfAttempts,
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
            up.status === UserTopicProblemStatusEnum.SOLVED
              ? up.numberOfAttempts - 1
              : up.numberOfAttempts,
          )
          .reduce((a, b) => a + b, 0),
      },
    })
  }

  async yearlUserStat(userId: string, seasonId: string, startDate?: Date, endDate?: Date) {
    const date = endDate ? new Date(endDate) : new Date()
    const start = new Date(`${date.getFullYear() - 1}-${date.getMonth()}-${date.getDate()}`)
    const yearlystat = await this.prismaService.userGroupSeasonDataAnalytics.groupBy({
      by: ['year'],
      where: {
        userId,
        createdAt: {
          lte: endDate,
          gte: start,
        },
        seasonId,
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

  async weeklyUserStart(userId: string, seasonId: string, startDate?: Date, endDate?: Date) {
    const date = endDate ? new Date(endDate) : new Date()
    const start = startDate
      ? new Date(startDate)
      : new Date(`${date.getFullYear() - 1}-${date.getMonth()}-${date.getDate()}`)
    const weeklystat = await this.prismaService.userGroupSeasonDataAnalytics.groupBy({
      by: ['week'],
      where: {
        userId,
        createdAt: {
          lte: endDate,
          gte: start,
        },
        seasonId,
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

  async montlyUserStart(userId: string, seasonId: string, startDate?: Date, endDate?: Date) {
    const date = endDate ? new Date(endDate) : new Date()
    const start = new Date(`${date.getFullYear() - 1}-${date.getMonth()}-${date.getDate()}`)
    const monthlystat = await this.prismaService.userGroupSeasonDataAnalytics.groupBy({
      by: ['month'],
      where: {
        userId,
        createdAt: {
          lte: endDate,
          gte: start,
        },
        seasonId,
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

  async userStat(userId: string, seasonId: string, startDate?: Date, endDate?: Date) {
    const date = endDate ? new Date(endDate) : new Date()
    const start = startDate
      ? new Date(startDate)
      : new Date(`${date.getFullYear() - 1}-${date.getMonth()}-${date.getDate()}`)
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new NotFoundException('User Not Found With this ID')
    }
    const userdailystat = await this.prismaService.userGroupSeasonDataAnalytics.findMany({
      where: {
        userGroupSeason: {
          userId,
          groupId: user.groupId,
          seasonId,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return userdailystat
  }
}
