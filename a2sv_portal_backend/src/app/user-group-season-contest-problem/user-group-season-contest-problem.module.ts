import { Module } from '@nestjs/common'
import { UserGroupSeasonContestProblemRepository } from './user-group-season-contest-problem.repository'
import { UserGroupSeasonContestProblemService } from './user-group-season-contest-problem.service'
import { UserGroupSeasonContestProblemResolver } from './user-group-season-contest-problem.resolver'

@Module({
  providers: [UserGroupSeasonContestProblemResolver, UserGroupSeasonContestProblemRepository, UserGroupSeasonContestProblemService],
  exports: [UserGroupSeasonContestProblemRepository, UserGroupSeasonContestProblemService],
})
export class UserGroupSeasonContestProblemModule {
}
