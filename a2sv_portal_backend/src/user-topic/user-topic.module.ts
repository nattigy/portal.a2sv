import { Module } from '@nestjs/common'
import { CaslModule } from '../casl/casl.module'
import { UserTopicService } from './user-topic.service'
import { UserTopicResolver } from './user-topic.resolver'

@Module({
  providers: [UserTopicResolver, UserTopicService, CaslModule],
})
export class UserTopicModule {}
