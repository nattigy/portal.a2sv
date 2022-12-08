import { Module } from '@nestjs/common'
import { TopicRepository } from './topic.repository'
import { TopicResolver } from './topic.resolver'
import { TopicService } from './topic.service'

@Module({
  providers: [TopicRepository, TopicService, TopicResolver],
})
export class TopicModule {
}
