import { Module } from '@nestjs/common';
import { UserContestProblemService } from './user-contest-problem.service';
import { UserContestProblemResolver } from './user-contest-problem.resolver';
import {PrismaService} from "../prisma.service";

@Module({
  providers: [UserContestProblemResolver, UserContestProblemService,PrismaService]
})
export class UserContestProblemModule {}
