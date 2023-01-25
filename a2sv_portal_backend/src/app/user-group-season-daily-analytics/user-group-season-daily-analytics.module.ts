import { Module } from '@nestjs/common'
import { UserGroupSeasonDailyAnalyticsService } from './user-group-season-daily-analytics.service'
import { UserGroupSeasonDailyAnalyticResolver } from './user-group-season-daily-analytic.resolver'
import {
  UserGroupSeasonWeeklyAnalyticsModule
} from '../user-group-season-weekly-analytics/user-group-season-weekly-analytics.module'
import {
  UserGroupSeasonMonthlyAnalyticsModule
} from '../user-group-season-monthly-analytics/user-group-season-monthly-analytics.module'

@Module({
  providers: [UserGroupSeasonDailyAnalyticsService, UserGroupSeasonDailyAnalyticResolver],
  exports: [UserGroupSeasonDailyAnalyticsService],
})
export class UserGroupSeasonDailyAnalyticsModule {}
