import { Module } from '@nestjs/common'
import { UserSeasonContestResolver } from './user-season-contest.resolver'
import { UserSeasonContestService } from './user-season-contest.service'

@Module({
  providers: [UserSeasonContestResolver, UserSeasonContestService],
  exports: [UserSeasonContestService],
})
export class UserSeasonContestModule {}
