import { Module } from '@nestjs/common';
import { UsersUpdateProblemStatusService } from './users-update-problem-status.service';
import { UsersUpdateProblemStatusResolver } from './users-update-problem-status.resolver';

@Module({
  providers: [UsersUpdateProblemStatusService, UsersUpdateProblemStatusResolver]
})
export class UsersUpdateProblemStatusModule {}
