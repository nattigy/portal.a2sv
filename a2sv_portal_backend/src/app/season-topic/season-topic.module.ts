import { Module } from '@nestjs/common'
import { SeasonTopicResolver } from './season-topic.resolver'
import { SeasonTopicService } from './season-topic.service'
import { SeasonTopicRepository } from './season-topic.repository'

@Module({
  providers: [SeasonTopicRepository, SeasonTopicResolver, SeasonTopicService],
  exports: [SeasonTopicService, SeasonTopicRepository],
})
export class SeasonTopicModule {
}
