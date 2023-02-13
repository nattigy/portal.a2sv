import { Module } from '@nestjs/common';
import { UserUpdateContestProblemService } from './user-update-contest-problem.service';
import { UserUpdateContestProblemResolver } from './user-update-contest-problem.resolver';

@Module({
  providers: [UserUpdateContestProblemResolver, UserUpdateContestProblemService]
})
export class UserUpdateContestProblemModule {}
