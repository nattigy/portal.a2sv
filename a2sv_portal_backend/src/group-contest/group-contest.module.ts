import { Module } from '@nestjs/common'
import { CaslModule } from '../casl/casl.module'
import { GroupContestService } from './group-contest.service'
import { GroupContestResolver } from './group-contest.resolver'
import { PrismaService } from '../prisma.service'

@Module({
  providers: [
    GroupContestResolver,
    GroupContestService,
    PrismaService,
    CaslModule,
  ],
})
export class GroupContestModule {}
