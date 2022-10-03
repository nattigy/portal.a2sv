import { Module } from '@nestjs/common'
import { GroupTopicSeasonProblemUserService } from './group-topic-season-problem-user.service'
import { GroupTopicSeasonProblemUserResolver } from './group-topic-season-problem-user.resolver'

@Module({
  providers: [
    GroupTopicSeasonProblemUserResolver,
    GroupTopicSeasonProblemUserService,
  ],
})
export class GroupTopicSeasonProblemUserModule {}
