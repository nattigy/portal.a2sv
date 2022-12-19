import { Module } from '@nestjs/common'
import { UserGroupSeasonTopicRepository } from './user-group-season-topic.repository'

@Module({
  providers: [UserGroupSeasonTopicRepository],
  exports: [UserGroupSeasonTopicRepository],
})
export class UserGroupSeasonTopicModule {}
