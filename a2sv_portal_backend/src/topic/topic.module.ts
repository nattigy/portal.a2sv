import { Module } from '@nestjs/common'
import { TopicResolver } from './topic.resolver'
import { TopicService } from './topic.service'

@Module({
  providers: [TopicService, TopicResolver],
})
export class TopicModule {}
