import { Module } from '@nestjs/common'
import { UserGroupSeasonContestRepository } from './user-group-season-contest.repository'
import { UserGroupSeasonContestService } from './user-group-season-contest.service'

@Module({
  providers: [UserGroupSeasonContestRepository, UserGroupSeasonContestService],
  exports: [UserGroupSeasonContestRepository, UserGroupSeasonContestService],
})
export class UserGroupSeasonContestModule {}
