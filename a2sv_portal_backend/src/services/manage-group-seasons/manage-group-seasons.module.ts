import { Module } from '@nestjs/common'
import { ManageGroupSeasonsResolver } from './manage-group-seasons.resolver'
import { ManageGroupSeasonsService } from './manage-group-seasons.service'
import { ManageGroupSeasonTopicService } from './manage-group-season-topics.service'
import { ManageGroupSeasonTopicProblemsService } from './manage-group-season-topic-problems.service'
import { GroupSeasonModule } from '../../app/group-season/group-season.module'
import { GroupSeasonTopicModule } from '../../app/group-season-topic/group-season-topic.module'
import { GroupSeasonTopicProblemModule } from '../../app/group-season-topic-problem/group-season-topic-problem.module'
import { SeasonTopicModule } from '../../app/season-topic/season-topic.module'
import { SeasonTopicProblemModule } from '../../app/season-topic-problem/season-topic-problem.module'

@Module({
  imports: [
    SeasonTopicModule,
    SeasonTopicProblemModule,
    GroupSeasonModule,
    GroupSeasonTopicModule,
    GroupSeasonTopicProblemModule,
  ],
  providers: [
    ManageGroupSeasonsResolver,
    ManageGroupSeasonsService,
    ManageGroupSeasonTopicService,
    ManageGroupSeasonTopicProblemsService,
  ],
})
export class ManageGroupSeasonsModule {}
