import { Module } from '@nestjs/common'
import { UserGroupSeasonService } from './user-group-season.service'
import { UserGroupSeasonResolver } from './user-group-season.resolver'
import { UserGroupSeasonRepository } from './user-group-season.repository'
import { UserGroupSeasonTopicModule } from '../user-group-season-topic/user-group-season-topic.module'

@Module({
  imports: [UserGroupSeasonTopicModule],
  providers: [UserGroupSeasonRepository, UserGroupSeasonResolver, UserGroupSeasonService],
  exports: [UserGroupSeasonRepository, UserGroupSeasonService],
})
export class UserGroupSeasonModule {}
