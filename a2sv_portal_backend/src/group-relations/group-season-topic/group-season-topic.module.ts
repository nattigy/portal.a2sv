import { Module } from '@nestjs/common'
import { GroupSeasonTopicService } from './group-season-topic.service'
import { GroupSeasonTopicResolver } from './group-season-topic.resolver'
import { GroupSeasonTopicRepository } from './group-season-topic.repository'

@Module({
  providers: [GroupSeasonTopicRepository, GroupSeasonTopicResolver, GroupSeasonTopicService],
  exports: [GroupSeasonTopicService, GroupSeasonTopicRepository],
})
export class GroupSeasonTopicModule {}
