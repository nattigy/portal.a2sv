import { Module } from '@nestjs/common'
import { GroupSeasonTopicProblemRepository } from './group-season-topic-problem.repository'

@Module({
  providers: [GroupSeasonTopicProblemRepository],
  exports: [GroupSeasonTopicProblemRepository],
})
export class GroupSeasonTopicProblemModule {}
