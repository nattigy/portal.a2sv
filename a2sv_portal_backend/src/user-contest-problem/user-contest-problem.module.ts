import { Module } from '@nestjs/common'
import { CaslModule } from '../casl/casl.module'
import { UserContestProblemService } from './user-contest-problem.service'
import { UserContestProblemResolver } from './user-contest-problem.resolver'
import { PrismaService } from '../prisma.service'

@Module({
  providers: [
    UserContestProblemResolver,
    UserContestProblemService,
    PrismaService,
    CaslModule,
  ],
})
export class UserContestProblemModule {}
