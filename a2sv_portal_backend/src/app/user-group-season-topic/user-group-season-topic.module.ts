import { Module } from '@nestjs/common'
import { UserGroupSeasonTopicRepository } from './user-group-season-topic.repository'
import { UserGroupSeasonTopicService } from './user-group-season-topic.service'

@Module({
  providers: [UserGroupSeasonTopicRepository, UserGroupSeasonTopicService],
  exports: [UserGroupSeasonTopicRepository, UserGroupSeasonTopicService],
})
export class UserGroupSeasonTopicModule {
}
