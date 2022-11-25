import { Module } from '@nestjs/common'
import { SeasonTopicUserProblemResolver } from './season-topic-user-problem.resolver'
import { SeasonTopicUserProblemService } from './season-topic-user-problem.service'

@Module({
  providers: [SeasonTopicUserProblemResolver, SeasonTopicUserProblemService],
})
export class SeasonTopicUserProblemModule {}
