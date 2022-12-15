import { Module } from '@nestjs/common'
import { UserGroupSeasonService } from './user-group-season.service'
import { UserGroupSeasonResolver } from './user-group-season.resolver'
import { UserGroupSeasonRepository } from './user-group-season.repository'
import { UserGroupSeasonTopicModule } from '../user-group-season-topic/user-group-season-topic.module'
import { UserGroupSeasonTopicService } from '../user-group-season-topic/user-group-season-topic.service'
import { UserGroupSeasonTopicRepository } from '../user-group-season-topic/user-group-season-topic.repository'

@Module({
  imports: [UserGroupSeasonTopicModule],
  providers: [UserGroupSeasonRepository, UserGroupSeasonResolver, UserGroupSeasonService],
  exports: [UserGroupSeasonTopicService, UserGroupSeasonTopicRepository],
})
export class UserGroupSeasonModule {}
