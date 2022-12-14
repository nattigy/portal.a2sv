import { Module } from '@nestjs/common'
import { UserGroupSeasonContestRepository } from './user-season-contest.repository'
import { UserGroupSeasonContestResolver } from './user-season-contest.resolver'
import { UserGroupSeasonContestService } from './user-season-contest.service'

@Module({
  providers: [
    UserGroupSeasonContestRepository,
    UserGroupSeasonContestResolver,
    UserGroupSeasonContestService,
  ],
  exports: [UserGroupSeasonContestService],
})
export class UserGroupSeasonContestModule {}
