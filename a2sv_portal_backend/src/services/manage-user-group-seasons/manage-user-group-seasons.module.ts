import { Module } from '@nestjs/common'
import { GroupSeasonTopicProblemModule } from '../../app/group-season-topic-problem/group-season-topic-problem.module'
import {
  UserGroupSeasonTopicProblemModule,
} from '../../app/user-group-season-topic-problem/user-group-season-topic-problem.module'
import { UserGroupSeasonModule } from '../../app/user-group-season/user-group-season.module'
import { ManageUserGroupSeasonTopicProblemsService } from './manage-user-group-season-topic-problems.service'
import { ManageUserGroupSeasonTopicsService } from './manage-user-group-season-topics.service'
import { UserGroupSeasonTopicModule } from '../../app/user-group-season-topic/user-group-season-topic.module'
import { GroupSeasonTopicModule } from '../../app/group-season-topic/group-season-topic.module'
import { ManageUserGroupSeasonsService } from './manage-user-group-seasons.service'
import { ManageUserGroupSeasonsResolver } from './manage-user-group-seasons.resolver'
import { GroupSeasonModule } from '../../app/group-season/group-season.module'

@Module({
  imports: [
    GroupSeasonModule,
    GroupSeasonTopicModule,
    GroupSeasonTopicProblemModule,
    UserGroupSeasonModule,
    UserGroupSeasonTopicModule,
    UserGroupSeasonTopicProblemModule,
  ],
  providers: [
    ManageUserGroupSeasonsResolver,
    ManageUserGroupSeasonsService,
    ManageUserGroupSeasonTopicsService,
    ManageUserGroupSeasonTopicProblemsService,
  ],
  exports: [
    ManageUserGroupSeasonsService,
    ManageUserGroupSeasonTopicsService,
    ManageUserGroupSeasonTopicProblemsService,
  ],
})
export class ManageUserGroupSeasonsModule {
}
