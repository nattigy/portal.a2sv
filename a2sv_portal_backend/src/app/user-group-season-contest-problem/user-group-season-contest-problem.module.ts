import { Module } from '@nestjs/common'
import { UserGroupSeasonContestProblemRepository } from './user-group-season-contest-problem.repository'
import { UserGroupSeasonContestProblemService } from './user-group-season-contest-problem.service'

@Module({
  providers: [UserGroupSeasonContestProblemRepository, UserGroupSeasonContestProblemService],
  exports: [UserGroupSeasonContestProblemRepository, UserGroupSeasonContestProblemService],
})
export class UserGroupSeasonContestProblemModule {}
