import { Module } from '@nestjs/common'
import { GroupSeasonTopicProblemModule } from 'src/group-relations/group-season-topic-problem/group-season-topic-problem.module'
import { UserSeasonTopicProblemResolver } from './user-season-topic-problem.resolver'
import { UserSeasonTopicProblemService } from './user-season-topic-problem.service'

@Module({
  imports: [GroupSeasonTopicProblemModule],
  providers: [UserSeasonTopicProblemResolver, UserSeasonTopicProblemService],
})
export class UserSeasonTopicProblemModule {}
