import { Module } from '@nestjs/common'
import { SeasonTopicResolver } from './season-topic.resolver'
import { SeasonTopicService } from './season-topic.service'

@Module({
  providers: [SeasonTopicResolver, SeasonTopicService],
})
export class SeasonTopicModule {}
