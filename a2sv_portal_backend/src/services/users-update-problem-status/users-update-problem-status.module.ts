import { Module } from '@nestjs/common'
import { UsersUpdateProblemStatusService } from './users-update-problem-status.service'
import { UsersUpdateProblemStatusResolver } from './users-update-problem-status.resolver'
import { UserGroupSeasonTopicModule } from '../../app/user-group-season-topic/user-group-season-topic.module'
import { UserGroupSeasonModule } from '../../app/user-group-season/user-group-season.module'
import { UserGroupSeasonTopicProblemModule } from '../../app/user-group-season-topic-problem/user-group-season-topic-problem.module'

@Module({
  imports: [
    UserGroupSeasonModule,
    UserGroupSeasonTopicModule,
    UserGroupSeasonTopicProblemModule,
  ],
  providers: [UsersUpdateProblemStatusService, UsersUpdateProblemStatusResolver],
})
export class UsersUpdateProblemStatusModule {}
