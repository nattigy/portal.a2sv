import { Module } from '@nestjs/common'
import { SeasonTopicProblemUserResolver } from './season-topic-problem-user.resolver'
import { SeasonTopicProblemUserService } from './season-topic-problem-user.service'

@Module({
  providers: [SeasonTopicProblemUserResolver, SeasonTopicProblemUserService],
})
export class SeasonTopicProblemUserModule {}
