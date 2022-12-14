import { Module } from '@nestjs/common'
import { UserGroupSeasonContestProblemResolver } from './user-group-season-contest-problem.resolver'
import { UserGroupSeasonContestProblemService } from './user-group-season-contest-problem.service'
import { UserSeasonContestModule } from '../user-group-season-contest/user-season-contest.module'

@Module({
  providers: [UserGroupSeasonContestProblemResolver, UserGroupSeasonContestProblemService],
  imports: [UserSeasonContestModule],
})
export class UserGroupSeasonContestProblemModule {}
