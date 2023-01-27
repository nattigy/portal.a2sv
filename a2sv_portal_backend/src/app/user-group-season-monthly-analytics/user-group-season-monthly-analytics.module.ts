import { Module } from '@nestjs/common';
import { UserGroupSeasonMonthlyAnalyticsService } from './user-group-season-monthly-analytics.service';
import { UserGroupSeasonMonthlyAnalyticsResolver } from './user-group-season-monthly-analytics.resolver';

@Module({
  providers: [UserGroupSeasonMonthlyAnalyticsResolver, UserGroupSeasonMonthlyAnalyticsService],
  exports: [UserGroupSeasonMonthlyAnalyticsService]
})
export class UserGroupSeasonMonthlyAnalyticsModule {}
