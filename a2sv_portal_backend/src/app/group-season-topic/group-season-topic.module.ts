import { Module } from '@nestjs/common'
import { GroupSeasonTopicRepository } from './group-season-topic.repository'

@Module({
  providers: [GroupSeasonTopicRepository],
  exports: [GroupSeasonTopicRepository],
})
export class GroupSeasonTopicModule {}
