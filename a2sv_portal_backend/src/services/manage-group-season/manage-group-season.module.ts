import { Module } from '@nestjs/common'
import { ManageGroupSeasonResolver } from './manage-group-season.resolver'
import { GroupSeasonService } from './group-season.service'
import { GroupSeasonTopicService } from './group-season-topic.service'
import { GroupSeasonTopicProblemService } from './group-season-topic-problem.service'
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
    GroupSeasonTopicProblemModule
  ],
  providers: [ManageGroupSeasonResolver, GroupSeasonService, GroupSeasonTopicService, GroupSeasonTopicProblemService],
})
export class ManageGroupSeasonModule {
}
