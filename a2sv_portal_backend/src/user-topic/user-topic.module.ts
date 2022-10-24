import { Module } from '@nestjs/common'
import { UserTopicService } from './user-topic.service'
import { UserTopicResolver } from './user-topic.resolver'

@Module({
  providers: [UserTopicResolver, UserTopicService],
})
export class UserTopicModule {}
