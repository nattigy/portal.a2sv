import { Module } from '@nestjs/common'
import { UserSeasonTopicResolver } from './user-season-topic.resolver'
import { UserSeasonTopicService } from './user-season-topic.service'

@Module({
  providers: [UserSeasonTopicResolver, UserSeasonTopicService],
})
export class UserSeasonTopicModule {}
