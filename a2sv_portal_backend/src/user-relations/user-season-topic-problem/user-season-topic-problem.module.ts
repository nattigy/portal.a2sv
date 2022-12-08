import { Module } from '@nestjs/common'
import {
  GroupSeasonTopicProblemModule,
} from 'src/group-relations/group-season-topic-problem/group-season-topic-problem.module'
import { UserSeasonTopicProblemRepository } from './user-season-topic-problem.repository'
import { UserSeasonTopicProblemResolver } from './user-season-topic-problem.resolver'
import { UserSeasonTopicProblemService } from './user-season-topic-problem.service'

@Module({
  imports: [GroupSeasonTopicProblemModule],
  providers: [UserSeasonTopicProblemRepository, UserSeasonTopicProblemResolver, UserSeasonTopicProblemService],
})
export class UserSeasonTopicProblemModule {
}
