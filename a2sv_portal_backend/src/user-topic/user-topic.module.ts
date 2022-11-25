import { Module } from '@nestjs/common'
import { UserTopicResolver } from './user-topic.resolver'
import { UserTopicService } from './user-topic.service'

@Module({
  providers: [UserTopicResolver, UserTopicService],
})
export class UserTopicModule {}
