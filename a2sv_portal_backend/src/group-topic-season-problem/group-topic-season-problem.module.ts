import { Module } from '@nestjs/common'
import { GroupTopicSeasonProblemService } from './group-topic-season-problem.service'
import { GroupTopicSeasonProblemResolver } from './group-topic-season-problem.resolver'

@Module({
  providers: [GroupTopicSeasonProblemResolver, GroupTopicSeasonProblemService],
})
export class GroupTopicSeasonProblemModule {}
