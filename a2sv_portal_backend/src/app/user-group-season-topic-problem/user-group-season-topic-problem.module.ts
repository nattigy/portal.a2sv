import { Module } from '@nestjs/common'
import { UserGroupSeasonTopicProblemRepository } from './user-group-season-topic-problem.repository'
import { UserGroupSeasonTopicProblemService } from './user-group-season-topic-problem.service'

@Module({
  providers: [UserGroupSeasonTopicProblemRepository, UserGroupSeasonTopicProblemService],
  exports: [UserGroupSeasonTopicProblemService, UserGroupSeasonTopicProblemRepository],
})
export class UserGroupSeasonTopicProblemModule {}
