import { Module } from '@nestjs/common'
import { UserSeasonContestRepository } from './user-season-contest.repository'
import { UserSeasonContestResolver } from './user-season-contest.resolver'
import { UserSeasonContestService } from './user-season-contest.service'

@Module({
  providers: [
    UserSeasonContestRepository,
    UserSeasonContestResolver,
    UserSeasonContestService,
  ],
  exports: [UserSeasonContestService],
})
export class UserSeasonContestModule {
}
