import { Module } from '@nestjs/common'
import { UserContestProblemResolver } from './user-contest-problem.resolver'
import { UserContestProblemService } from './user-contest-problem.service'
import { UserContestModule } from '../user-contest/user-contest.module'

@Module({
  providers: [UserContestProblemResolver, UserContestProblemService],
  imports: [UserContestModule],
})
export class UserContestProblemModule {}
