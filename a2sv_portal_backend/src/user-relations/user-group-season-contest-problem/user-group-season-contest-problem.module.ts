import { Module } from '@nestjs/common'
import { UserGroupSeasonContestProblemResolver } from './user-group-season-contest-problem.resolver'
import { UserGroupSeasonContestProblemService } from './user-group-season-contest-problem.service'
import { UserGroupSeasonContestModule } from '../user-group-season-contest/user-group-season-contest.module'

@Module({
  providers: [UserGroupSeasonContestProblemResolver, UserGroupSeasonContestProblemService],
  imports: [UserGroupSeasonContestModule],
})
export class UserGroupSeasonContestProblemModule {}
