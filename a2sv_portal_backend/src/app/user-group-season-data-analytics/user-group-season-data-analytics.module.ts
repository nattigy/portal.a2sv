import { Module } from '@nestjs/common'
import { UserGroupSeasonDataAnalyticsService } from './user-group-season-data-analytics.service'
import { UserGroupSeasonDataAnalyticsResolver } from './user-group-season-data-analytics.resolver'

@Module({
  providers: [UserGroupSeasonDataAnalyticsResolver, UserGroupSeasonDataAnalyticsService],
  exports: [UserGroupSeasonDataAnalyticsService],
})
export class UserGroupSeasonDataAnalyticsModule {}
