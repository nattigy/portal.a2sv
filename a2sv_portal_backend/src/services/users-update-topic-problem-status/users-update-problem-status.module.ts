import { Module } from '@nestjs/common'
import { UsersUpdateProblemStatusService } from './users-update-problem-status.service'
import { UsersUpdateProblemStatusResolver } from './users-update-problem-status.resolver'
import { UserGroupSeasonModule } from '../../app/user-group-season/user-group-season.module'
import { UserGroupSeasonTopicProblemModule } from '../../app/user-group-season-topic-problem/user-group-season-topic-problem.module'
import { UserGroupSeasonDataAnalyticsModule } from '../../app/user-group-season-data-analytics/user-group-season-data-analytics.module'

@Module({
  imports: [
    UserGroupSeasonModule,
    UserGroupSeasonTopicProblemModule,
    UserGroupSeasonDataAnalyticsModule,
  ],
  providers: [UsersUpdateProblemStatusService, UsersUpdateProblemStatusResolver],
})
export class UsersUpdateProblemStatusModule {}
