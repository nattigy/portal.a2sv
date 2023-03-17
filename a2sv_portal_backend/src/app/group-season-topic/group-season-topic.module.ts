import { Module } from '@nestjs/common'
import { GroupSeasonTopicRepository } from './group-season-topic.repository'
import { GroupSeasonTopicService } from './group-season-topic.service'
import { GroupSeasonTopicResolver } from './group-season-topic.resolver'

@Module({
  providers: [GroupSeasonTopicResolver, GroupSeasonTopicRepository, GroupSeasonTopicService],
  exports: [GroupSeasonTopicRepository, GroupSeasonTopicService],
})
export class GroupSeasonTopicModule {}
