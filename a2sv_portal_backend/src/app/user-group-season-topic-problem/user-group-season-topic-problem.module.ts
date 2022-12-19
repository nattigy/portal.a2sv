import { Module } from '@nestjs/common'
import { UserGroupSeasonTopicProblemRepository } from './user-group-season-topic-problem.repository'

@Module({
  providers: [UserGroupSeasonTopicProblemRepository],
  exports: [UserGroupSeasonTopicProblemRepository],
})
export class UserGroupSeasonTopicProblemModule {}
