import { Module } from '@nestjs/common'
import { UserGroupSeasonContestProblemRepository } from './user-group-season-contest-problem.repository'

@Module({
  providers: [UserGroupSeasonContestProblemRepository],
})
export class UserGroupSeasonContestProblemModule {}
