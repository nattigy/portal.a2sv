import { Module } from '@nestjs/common'
import { UserGroupSeasonTopicResolver } from './user-group-season-topic.resolver'
import { UserGroupSeasonTopicService } from './user-group-season-topic.service'
import { UserGroupSeasonTopicRepository } from './user-group-season-topic.repository'
import { UserGroupSeasonTopicProblemModule } from '../user-group-season-topic-problem/user-group-season-topic-problem.module'

@Module({
  imports: [UserGroupSeasonTopicProblemModule],
  providers: [
    UserGroupSeasonTopicRepository,
    UserGroupSeasonTopicResolver,
    UserGroupSeasonTopicService,
  ],
  exports: [UserGroupSeasonTopicService],
})
export class UserGroupSeasonTopicModule {}
