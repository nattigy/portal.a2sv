import { Module } from '@nestjs/common'
import { UserGroupSeasonContestProblemResolver } from './user-group-season-contest-problem.resolver'
import { UserGroupSeasonContestProblemService } from './user-group-season-contest-problem.service'
import { UserGroupSeasonContestProblemRepository } from './user-group-season-contest-problem.repository'

@Module({
  providers: [
    UserGroupSeasonContestProblemRepository,
    UserGroupSeasonContestProblemResolver,
    UserGroupSeasonContestProblemService,
  ],
  exports: [UserGroupSeasonContestProblemRepository, UserGroupSeasonContestProblemService],
})
export class UserGroupSeasonContestProblemModule {}
