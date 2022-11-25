import { Module } from '@nestjs/common'
import { SeasonTopicProblemResolver } from './season-topic-problem.resolver'
import { SeasonTopicProblemService } from './season-topic-problem.service'

@Module({
  providers: [SeasonTopicProblemResolver, SeasonTopicProblemService],
})
export class SeasonTopicProblemModule {}
