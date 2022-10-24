import { Module } from '@nestjs/common';
import { UserContestProblemService } from './user-contest-problem.service';
import { UserContestProblemResolver } from './user-contest-problem.resolver';

@Module({
  providers: [UserContestProblemResolver, UserContestProblemService]
})
export class UserContestProblemModule {}
