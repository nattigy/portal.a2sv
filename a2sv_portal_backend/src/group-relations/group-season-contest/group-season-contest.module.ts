import { Module } from '@nestjs/common'
import { GroupSeasonContestService } from './group-season-contest.service'
import { GroupSeasonContestResolver } from './group-season-contest.resolver'

@Module({
  providers: [GroupSeasonContestResolver, GroupSeasonContestService],
})
export class GroupSeasonContestModule {}
