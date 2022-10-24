import { Module } from '@nestjs/common';
import { GroupContestService } from './group-contest.service';
import { GroupContestResolver } from './group-contest.resolver';

@Module({
  providers: [GroupContestResolver, GroupContestService]
})
export class GroupContestModule {}
