import { Module } from '@nestjs/common'
import { UserContestService } from './user-contest.service'
import { UserContestResolver } from './user-contest.resolver'
import { PrismaService } from '../prisma.service'

@Module({
  providers: [UserContestResolver, UserContestService, PrismaService],
})
export class UserContestModule {}
