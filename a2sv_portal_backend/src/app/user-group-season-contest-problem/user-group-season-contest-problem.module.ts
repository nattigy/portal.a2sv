import { Module } from '@nestjs/common'
import { UserGroupSeasonContestProblemRepository } from './user-group-season-contest-problem.repository'

@Module({
  providers: [UserGroupSeasonContestProblemRepository],
  exports: [UserGroupSeasonContestProblemRepository],
})
export class UserGroupSeasonContestProblemModule {}
