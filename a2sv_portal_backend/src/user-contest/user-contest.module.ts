import { Module } from '@nestjs/common';
import { UserContestService } from './user-contest.service';
import { UserContestResolver } from './user-contest.resolver';

@Module({
  providers: [UserContestResolver, UserContestService]
})
export class UserContestModule {}
