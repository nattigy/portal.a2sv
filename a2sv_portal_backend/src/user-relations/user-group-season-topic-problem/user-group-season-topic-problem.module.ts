import { Module } from '@nestjs/common'
import { GroupSeasonTopicProblemModule } from 'src/group-relations/group-season-topic-problem/group-season-topic-problem.module'
import { UserGroupSeasonTopicProblemRepository } from './user-group-season-topic-problem.repository'
import { UserGroupSeasonTopicProblemResolver } from './user-group-season-topic-problem.resolver'
import { UserGroupSeasonTopicProblemService } from './user-group-season-topic-problem.service'

@Module({
  imports: [GroupSeasonTopicProblemModule],
  providers: [
    UserGroupSeasonTopicProblemRepository,
    UserGroupSeasonTopicProblemResolver,
    UserGroupSeasonTopicProblemService,
  ],
})
export class UserGroupSeasonTopicProblemModule {}
