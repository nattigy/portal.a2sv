import { Module } from '@nestjs/common'
import { UserGroupSeasonDailyAnalyticsService } from './user-group-season-daily-analytics.service'
import { UserGroupSeasonDailyAnalyticResolver } from './user-group-season-daily-analytic.resolver'

@Module({
  providers: [UserGroupSeasonDailyAnalyticsService, UserGroupSeasonDailyAnalyticResolver],
  exports: [UserGroupSeasonDailyAnalyticsService],
})
export class UserGroupSeasonDailyAnalyticsModule {}
