import { Module } from '@nestjs/common'
import { ManageGroupSeasonContestService } from './manage-group-season-contest.service'
import { ManageGroupSeasonContestResolver } from './manage-group-season-contest.resolver'
import { ContestModule } from '../../app/contest/contest.module'
import { GroupSeasonContestModule } from '../../app/group-season-contest/group-season-contest.module'
import { GroupSeasonContestProblemModule } from '../../app/group-season-contest-problem/group-season-contest-problem.module'
import { GroupSeasonModule } from '../../app/group-season/group-season.module'

@Module({
  imports: [
    ContestModule,
    GroupSeasonContestModule,
    GroupSeasonContestProblemModule,
    GroupSeasonModule,
  ],
  providers: [ManageGroupSeasonContestResolver, ManageGroupSeasonContestService],
})
export class ManageGroupSeasonContestModule {}
