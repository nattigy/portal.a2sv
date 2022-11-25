import { Module } from '@nestjs/common'
import { GroupContestResolver } from './group-contest.resolver'
import { GroupContestService } from './group-contest.service'
import { UserContestModule } from '../user-contest/user-contest.module'

@Module({
  imports: [UserContestModule],
  providers: [GroupContestResolver, GroupContestService],
})
export class GroupContestModule {}
