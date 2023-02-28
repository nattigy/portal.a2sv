import { Module } from '@nestjs/common'
import { GroupSeasonTopicRepository } from './group-season-topic.repository'
import { GroupSeasonTopicService } from './group-season-topic.service'

@Module({
  providers: [GroupSeasonTopicRepository, GroupSeasonTopicService],
  exports: [GroupSeasonTopicRepository, GroupSeasonTopicService],
})
export class GroupSeasonTopicModule {
}
