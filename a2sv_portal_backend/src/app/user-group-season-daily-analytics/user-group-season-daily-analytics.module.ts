import { Module } from '@nestjs/common';
import { UserGroupSeasonDailyAnalyticsService } from './user-group-season-daily-analytics.service';

@Module({
  providers: [UserGroupSeasonDailyAnalyticsService]
})
export class UserGroupSeasonDailyAnalyticsModule {}
