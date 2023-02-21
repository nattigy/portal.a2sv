import { Module } from '@nestjs/common'
import { UserGroupSeasonContestRepository } from './user-group-season-contest.repository'
import { UserGroupSeasonContestProblemModule } from '../user-group-season-contest-problem/user-group-season-contest-problem.module'

@Module({
  imports: [UserGroupSeasonContestProblemModule],
  providers: [UserGroupSeasonContestRepository],
  exports: [UserGroupSeasonContestRepository],
})
export class UserGroupSeasonContestModule {}
