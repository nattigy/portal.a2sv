import { Module } from '@nestjs/common'
import { UserSeasonTopicProblemResolver } from './user-season-topic-problem.resolver'
import { UserSeasonTopicProblemService } from './user-season-topic-problem.service'

@Module({
  providers: [UserSeasonTopicProblemResolver, UserSeasonTopicProblemService],
})
export class UserSeasonTopicProblemModule {}
