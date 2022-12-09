import { Module } from '@nestjs/common'
import { SeasonTopicProblemResolver } from './season-topic-problem.resolver'
import { SeasonTopicProblemService } from './season-topic-problem.service'
import { SeasonTopicProblemRepository } from './season-topic-problem.repository'

@Module({
  providers: [
    SeasonTopicProblemRepository,
    SeasonTopicProblemResolver,
    SeasonTopicProblemService,
  ],
})
export class SeasonTopicProblemModule {
}
