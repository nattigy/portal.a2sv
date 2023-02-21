import { Module } from '@nestjs/common'
import { ManageUserGroupSeasonResolver } from './manage-user-group-season.resolver'
import { UserGroupSeasonService } from './user-group-season.service'
import { UserGroupSeasonContestService } from './user-group-season-contest.service'
import { UserGroupSeasonContestProblemService } from './user-group-season-contest-problem.service'
import { UserGroupSeasonTopicService } from './user-group-season-topic.service'
import { UserGroupSeasonTopicProblemService } from './user-group-season-topic-problem.service'
import { UserGroupSeasonModule } from '../../app/user-group-season/user-group-season.module'
import { UserGroupSeasonContestModule } from '../../app/user-group-season-contest/user-group-season-contest.module'
import { UserGroupSeasonTopicModule } from '../../app/user-group-season-topic/user-group-season-topic.module'
import { UserGroupSeasonTopicProblemModule } from '../../app/user-group-season-topic-problem/user-group-season-topic-problem.module'
import { UserGroupSeasonContestProblemModule } from '../../app/user-group-season-contest-problem/user-group-season-contest-problem.module'
import { GroupSeasonTopicModule } from '../../app/group-season-topic/group-season-topic.module'
import { GroupSeasonTopicProblemModule } from '../../app/group-season-topic-problem/group-season-topic-problem.module'

@Module({
  imports: [
    UserGroupSeasonModule,
    UserGroupSeasonTopicModule,
    UserGroupSeasonTopicProblemModule,
    UserGroupSeasonContestModule,
    UserGroupSeasonContestProblemModule,
    GroupSeasonTopicModule,
    GroupSeasonTopicProblemModule,
  ],
  providers: [
    ManageUserGroupSeasonResolver,
    UserGroupSeasonService,
    UserGroupSeasonContestService,
    UserGroupSeasonContestProblemService,
    UserGroupSeasonTopicService,
    UserGroupSeasonTopicProblemService,
  ],
})
export class ManageUserGroupSeasonModule {}
