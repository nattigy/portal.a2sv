import { Module } from '@nestjs/common'
import { UserContestResolver } from './user-contest.resolver'
import { UserContestService } from './user-contest.service'

@Module({
  providers: [UserContestResolver, UserContestService],
})
export class UserContestModule {}
