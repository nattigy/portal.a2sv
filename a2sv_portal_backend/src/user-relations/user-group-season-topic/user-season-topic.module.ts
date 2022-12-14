import { Module } from '@nestjs/common'
import { UserGroupSeasonTopicResolver } from './user-season-topic.resolver'
import { UserGroupSeasonTopicService } from './user-season-topic.service'
import { UserGroupSeasonTopicRepository } from './user-season-topic.repository'

@Module({
  providers: [UserGroupSeasonTopicRepository, UserGroupSeasonTopicResolver, UserGroupSeasonTopicService],
})
export class UserGroupSeasonTopicModule {}
