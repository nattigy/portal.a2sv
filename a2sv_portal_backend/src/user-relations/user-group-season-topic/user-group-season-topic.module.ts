import { Module } from '@nestjs/common'
import { UserGroupSeasonTopicResolver } from './user-group-season-topic.resolver'
import { UserGroupSeasonTopicService } from './user-group-season-topic.service'
import { UserGroupSeasonTopicRepository } from './user-group-season-topic.repository'
import { UserGroupSeasonTopicProblemModule } from '../user-group-season-topic-problem/user-group-season-topic-problem.module'
import { GroupSeasonTopicModule } from '../../group-relations/group-season-topic/group-season-topic.module'

@Module({
  imports: [UserGroupSeasonTopicProblemModule, GroupSeasonTopicModule],
  providers: [
    UserGroupSeasonTopicRepository,
    UserGroupSeasonTopicResolver,
    UserGroupSeasonTopicService,
  ],
  exports: [UserGroupSeasonTopicService],
})
export class UserGroupSeasonTopicModule {}
