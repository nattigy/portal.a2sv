import { Module } from '@nestjs/common'
import { UserGroupSeasonContestRepository } from './user-group-season-contest.repository'
import { UserGroupSeasonContestResolver } from './user-group-season-contest.resolver'
import { UserGroupSeasonContestService } from './user-group-season-contest.service'

@Module({
  providers: [
    UserGroupSeasonContestRepository,
    UserGroupSeasonContestResolver,
    UserGroupSeasonContestService,
  ],
  exports: [UserGroupSeasonContestService],
})
export class UserGroupSeasonContestModule {}
