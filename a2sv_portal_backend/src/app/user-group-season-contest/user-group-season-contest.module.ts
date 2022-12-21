import { Module } from '@nestjs/common'
import { UserGroupSeasonContestRepository } from './user-group-season-contest.repository'
import { UserGroupSeasonContestResolver } from '../../services/user-group-season-services/user-group-season-contest.resolver'
import { UserGroupSeasonContestService } from '../../services/user-group-season-services/user-group-season-contest.service'
import { UserGroupSeasonContestProblemModule } from '../user-group-season-contest-problem/user-group-season-contest-problem.module'

@Module({
  imports: [UserGroupSeasonContestProblemModule],
  providers: [
    UserGroupSeasonContestRepository,
    UserGroupSeasonContestResolver,
    UserGroupSeasonContestService,
  ],
  exports: [UserGroupSeasonContestService],
})
export class UserGroupSeasonContestModule {}
