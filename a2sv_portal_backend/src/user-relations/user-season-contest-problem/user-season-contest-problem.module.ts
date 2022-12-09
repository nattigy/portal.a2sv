import { Module } from '@nestjs/common'
import { UserSeasonContestProblemResolver } from './user-season-contest-problem.resolver'
import { UserSeasonContestProblemService } from './user-season-contest-problem.service'
import { UserSeasonContestModule } from '../user-season-contest/user-season-contest.module'

@Module({
  providers: [UserSeasonContestProblemResolver, UserSeasonContestProblemService],
  imports: [UserSeasonContestModule],
})
export class UserSeasonContestProblemModule {
}
