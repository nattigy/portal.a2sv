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
import { UserGroupSeasonTopicProblemModule } from '../app/user-group-season-topic-problem/user-group-season-topic-problem.module'
import { UserGroupSeasonResolver } from './user-group-season-services/user-group-season.resolver'
import { UserGroupSeasonService } from './user-group-season-services/user-group-season.service'
import { UserGroupSeasonTopicProblemService } from './user-group-season-services/user-group-season-topic-problem.service'
import { UserGroupSeasonTopicService } from './user-group-season-services/user-group-season-topic.service'

@Module({
  imports: [
    UserModule,
    GroupModule,
    SeasonModule,
    // ContestModule,
    SeasonTopicModule,
    SeasonTopicProblemModule,
    // SeasonContestModule,
    GroupSeasonModule,
    GroupSeasonTopicModule,
    GroupSeasonTopicProblemModule,
    // GroupSeasonContestModule,
    // GroupSeasonContestProblemModule,
    UserGroupSeasonModule,
    UserGroupSeasonTopicModule,
    UserGroupSeasonTopicProblemModule,
    // UserGroupSeasonContestModule,
    // UserGroupSeasonContestProblemModule,
  ],
  providers: [
    // ContestRepository,
    // ContestResolver,
    // ContestService,
    // SeasonContestRepository,
    // SeasonContestResolver,
    // SeasonContestService,
    GroupSeasonResolver,
    GroupSeasonService,
    GroupSeasonTopicService,
    GroupSeasonTopicProblemService,
    // GroupSeasonContestRepository,
    // GroupSeasonContestService,
    // GroupSeasonContestResolver,
    // GroupSeasonContestProblemService,
    UserGroupSeasonResolver,
    UserGroupSeasonService,
    UserGroupSeasonTopicService,
    UserGroupSeasonTopicProblemService,
    // UserGroupSeasonContestService,
    // UserGroupSeasonContestProblemService,
  ],
})
export class ServicesModule {}
