import { Module } from '@nestjs/common'
import { GroupContestResolver } from './group-contest.resolver'
import { GroupContestService } from './group-contest.service'

@Module({
  providers: [GroupContestResolver, GroupContestService],
})
export class GroupContestModule {}
