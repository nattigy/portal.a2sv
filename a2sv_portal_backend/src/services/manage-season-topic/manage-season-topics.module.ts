import { Module } from '@nestjs/common'
import { SeasonTopicModule } from '../../app/season-topic/season-topic.module'
import { SeasonTopicProblemModule } from '../../app/season-topic-problem/season-topic-problem.module'
import { ManageSeasonTopicsResolver } from './manage-season-topics.resolver'
import { ManageSeasonTopicService } from './manage-season-topics.service'

@Module({
  imports: [SeasonTopicModule, SeasonTopicProblemModule],
  providers: [ManageSeasonTopicsResolver, ManageSeasonTopicService],
})
export class ManageSeasonTopicsModule {}
