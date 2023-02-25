import { Module } from '@nestjs/common'
import { ManageContestService } from './manage-contest.service'
import { ManageContestResolver } from './manage-contest.resolver'
import { ContestModule } from '../../app/contest/contest.module'

@Module({
  imports:[ContestModule],
  providers: [ManageContestService, ManageContestResolver],
})
export class ManageContestModule {}
