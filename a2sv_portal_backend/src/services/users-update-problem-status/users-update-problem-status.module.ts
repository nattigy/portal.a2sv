import { Module } from '@nestjs/common'
import { UsersUpdateProblemStatusService } from './users-update-problem-status.service'
import { UsersUpdateProblemStatusResolver } from './users-update-problem-status.resolver'
import { UserGroupSeasonTopicModule } from '../../app/user-group-season-topic/user-group-season-topic.module'
import { UserGroupSeasonModule } from '../../app/user-group-season/user-group-season.module'
import { UserGroupSeasonTopicProblemModule } from '../../app/user-group-season-topic-problem/user-group-season-topic-problem.module'
import { UserGroupSeasonDailyAnalyticsModule } from '../../app/user-group-season-daily-analytics/user-group-season-daily-analytics.module'
import {
  UserGroupSeasonWeeklyAnalyticsModule
} from '../../app/user-group-season-weekly-analytics/user-group-season-weekly-analytics.module'
import {
  UserGroupSeasonMonthlyAnalyticsModule
} from '../../app/user-group-season-monthly-analytics/user-group-season-monthly-analytics.module'

@Module({
  imports: [
    UserGroupSeasonModule,
    UserGroupSeasonTopicModule,
    UserGroupSeasonTopicProblemModule,
    UserGroupSeasonDailyAnalyticsModule,
    UserGroupSeasonWeeklyAnalyticsModule,
    UserGroupSeasonMonthlyAnalyticsModule,
  ],
  providers: [UsersUpdateProblemStatusService, UsersUpdateProblemStatusResolver],
})
export class UsersUpdateProblemStatusModule {}
