import { Module } from '@nestjs/common'
import { GroupSeasonModule } from 'src/app/group-season/group-season.module'
import { GroupModule } from 'src/app/group/group.module'
import { GroupSeasonTopicModule } from 'src/app/group-season-topic/group-season-topic.module'
import { GroupSeasonTopicProblemModule } from 'src/app/group-season-topic-problem/group-season-topic-problem.module'
import { SeasonModule } from 'src/app/season/season.module'
import { SeasonTopicModule } from 'src/app/season-topic/season-topic.module'
import { SeasonTopicProblemModule } from 'src/app/season-topic-problem/season-topic-problem.module'
import { GroupSeasonResolver } from './group-season-services/group-season.resolver'
import { GroupSeasonService } from './group-season-services/group-season.service'
import { GroupSeasonTopicService } from './group-season-services/group-season-topic.service'
import { GroupSeasonTopicProblemService } from './group-season-services/group-season-topic-problem.service'
import { UserModule } from '../app/user/user.module'
import { UserGroupSeasonModule } from '../app/user-group-season/user-group-season.module'
import { UserGroupSeasonTopicModule } from '../app/user-group-season-topic/user-group-season-topic.module'
import {
  UserGroupSeasonTopicProblemModule,
} from '../app/user-group-season-topic-problem/user-group-season-topic-problem.module'
import { UserGroupSeasonResolver } from './user-group-season-services/user-group-season.resolver'
import { UserGroupSeasonService } from './user-group-season-services/user-group-season.service'
import {
  UserGroupSeasonTopicProblemService,
} from './user-group-season-services/user-group-season-topic-problem.service'
import { UserGroupSeasonTopicService } from './user-group-season-services/user-group-season-topic.service'
import { GroupSeasonContestModule } from '../app/group-season-contest/group-season-contest.module'
import {
  GroupSeasonContestProblemModule,
} from '../app/group-season-contest-problem/group-season-contest-problem.module'
import { SeasonContestModule } from '../app/season-contest/season-contest.module'
import { UserGroupSeasonContestModule } from '../app/user-group-season-contest/user-group-season-contest.module'
import {
  UserGroupSeasonContestProblemModule,
} from '../app/user-group-season-contest-problem/user-group-season-contest-problem.module'
import { GroupSeasonContestService } from './group-season-services/group-season-contest.service'
import { UserGroupSeasonContestService } from './user-group-season-services/user-group-season-contest.service'
import {
  UserGroupSeasonContestProblemService,
} from './user-group-season-services/user-group-season-contest-problem.service'

@Module({
  imports: [
    UserModule,
    GroupModule,
    SeasonModule,
    SeasonTopicModule,
    SeasonTopicProblemModule,
    SeasonContestModule,
    GroupSeasonModule,
    GroupSeasonTopicModule,
    GroupSeasonTopicProblemModule,
    GroupSeasonContestModule,
    GroupSeasonContestProblemModule,
    UserGroupSeasonModule,
    UserGroupSeasonTopicModule,
    UserGroupSeasonTopicProblemModule,
    UserGroupSeasonContestModule,
    UserGroupSeasonContestProblemModule,
  ],
  providers: [
    GroupSeasonResolver,
    GroupSeasonService,
    GroupSeasonTopicService,
    GroupSeasonTopicProblemService,
    GroupSeasonContestService,
    UserGroupSeasonResolver,
    UserGroupSeasonService,
    UserGroupSeasonTopicService,
    UserGroupSeasonTopicProblemService,
    UserGroupSeasonContestService,
    UserGroupSeasonContestProblemService,
  ],
})
export class ServicesModule {
}
