import { Args, Query, Resolver } from '@nestjs/graphql'
import { UserGroupSeasonDataAnalyticsService } from './user-group-season-data-analytics.service'
import { UserGroupSeasonDataAnalytics } from './entities/user-group-season-data-analytics'
import { StudentWeeklyAnalytic } from './entities/weekly-data-analytic-entity'
import { StudentMonthlyAnalytic } from './entities/montly-data-analytic-entity'
import { StudentYearlyAnalytic } from './entities/yearly-data-analytic-entity'

@Resolver(() => UserGroupSeasonDataAnalytics)
export class UserGroupSeasonDataAnalyticsResolver {
  constructor(
    private readonly studentDataAnalyticsService: UserGroupSeasonDataAnalyticsService,
  ) {}

  @Query(() => [UserGroupSeasonDataAnalytics])
  async studentDailyStat(
    @Args('user_id', { type: () => String }) userId: string,
    @Args('start_date', { type: () => Date, nullable: true }) startDate?: Date,
    @Args('end_date', { type: () => Date, nullable: true }) endDate?: Date,
  ): Promise<UserGroupSeasonDataAnalytics[]> {
    return this.studentDataAnalyticsService.userStat(userId, startDate, endDate)
  }

  @Query(() => [StudentWeeklyAnalytic])
  async studentWeeklyStat(
    @Args('user_id', { type: () => String }) userId: string,
    @Args('start_date', { type: () => Date, nullable: true }) startDate?: Date,
    @Args('end_date', { type: () => Date, nullable: true }) endDate?: Date,
  ) {
    return this.studentDataAnalyticsService.weeklyUserStart(userId, startDate, endDate)
  }

  @Query(() => [StudentMonthlyAnalytic])
  async studentMonthlyStat(
    @Args('user_id', { type: () => String }) userId: string,
    @Args('start_date', { type: () => Date, nullable: true }) startDate?: Date,
    @Args('end_date', { type: () => Date, nullable: true }) endDate?: Date,
  ) {
    return this.studentDataAnalyticsService.monthlyUserStart(userId, startDate, endDate)
  }

  @Query(() => [StudentYearlyAnalytic])
  async studentYearlyStat(
    @Args('user_id', { type: () => String }) userId: string,
    @Args('start_date', { type: () => Date, nullable: true }) startDate?: Date,
    @Args('end_date', { type: () => Date, nullable: true }) endDate?: Date,
  ) {
    return this.studentDataAnalyticsService.yearlyUserStat(userId, startDate, endDate)
  }
}
