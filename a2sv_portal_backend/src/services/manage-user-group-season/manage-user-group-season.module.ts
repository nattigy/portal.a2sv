import { Module } from '@nestjs/common'
import { GroupSeasonTopicProblemModule } from '../../app/group-season-topic-problem/group-season-topic-problem.module'
import {
  UserGroupSeasonTopicProblemModule,
} from '../../app/user-group-season-topic-problem/user-group-season-topic-problem.module'
import { UserGroupSeasonModule } from '../../app/user-group-season/user-group-season.module'
import { UserGroupSeasonTopicProblemService } from './user-group-season-topic-problem.service'
import { UserGroupSeasonTopicService } from './user-group-season-topic.service'
import { UserGroupSeasonTopicModule } from '../../app/user-group-season-topic/user-group-season-topic.module'
import { GroupSeasonTopicModule } from '../../app/group-season-topic/group-season-topic.module'
import { ManageUserGroupSeasonService } from './user-group-season.service'

@Module({
  imports: [
    GroupSeasonTopicProblemModule,
    UserGroupSeasonTopicProblemModule,
    UserGroupSeasonModule,
    UserGroupSeasonTopicModule,
    UserGroupSeasonTopicProblemModule,
    GroupSeasonTopicModule,
    GroupSeasonTopicProblemModule,
  ],
  providers: [
    ManageUserGroupSeasonService,
    UserGroupSeasonTopicService,
    UserGroupSeasonTopicProblemService,
  ],
  exports: [
    ManageUserGroupSeasonService,
    UserGroupSeasonTopicService,
    UserGroupSeasonTopicProblemService,
  ],
})
export class ManageUserGroupSeasonModule {
}
