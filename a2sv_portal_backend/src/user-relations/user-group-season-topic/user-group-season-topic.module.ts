import { Module } from '@nestjs/common'
import { UserGroupSeasonTopicResolver } from './user-group-season-topic.resolver'
import { UserGroupSeasonTopicService } from './user-group-season-topic.service'
import { UserGroupSeasonTopicRepository } from './user-group-season-topic.repository'

@Module({
  providers: [UserGroupSeasonTopicRepository, UserGroupSeasonTopicResolver, UserGroupSeasonTopicService],
})
export class UserGroupSeasonTopicModule {}
