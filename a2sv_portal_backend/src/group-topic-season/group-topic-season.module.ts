import { Module } from '@nestjs/common'
import { GroupTopicSeasonService } from './group-topic-season.service'
import { GroupTopicSeasonResolver } from './group-topic-season.resolver'

@Module({
  providers: [GroupTopicSeasonResolver, GroupTopicSeasonService],
})
export class GroupTopicSeasonModule {}
