import { Module } from '@nestjs/common';
import { UserGroupSeasonWeeklyAnalyticsService } from './user-group-season-weekly-analytics.service';
import { UserGroupSeasonWeeklyAnalyticsResolver } from './user-group-season-weekly-analytics.resolver';

@Module({
  providers: [UserGroupSeasonWeeklyAnalyticsResolver, UserGroupSeasonWeeklyAnalyticsService],
  exports: [UserGroupSeasonWeeklyAnalyticsService]
})
export class UserGroupSeasonWeeklyAnalyticsModule {}
