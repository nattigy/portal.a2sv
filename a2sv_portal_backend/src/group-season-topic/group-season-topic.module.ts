import { Module } from '@nestjs/common';
import { GroupSeasonTopicService } from './group-season-topic.service';
import { GroupSeasonTopicResolver } from './group-season-topic.resolver';

@Module({
  providers: [GroupSeasonTopicResolver, GroupSeasonTopicService]
})
export class GroupSeasonTopicModule {}
