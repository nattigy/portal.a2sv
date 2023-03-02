import { Module } from '@nestjs/common'
import { UsersUpdateTopicComfortabilityService } from './users-update-topic-comfortability.service'
import { UsersUpdateTopicComfortabilityResolver } from './users-update-topic-comfortability.resolver'
import { UserGroupSeasonTopicModule } from '../../app/user-group-season-topic/user-group-season-topic.module'

@Module({
  imports: [UserGroupSeasonTopicModule],
  providers: [UsersUpdateTopicComfortabilityResolver, UsersUpdateTopicComfortabilityService],
})
export class UsersUpdateTopicComfortabilityModule {
}
