import { Module } from '@nestjs/common'
import { GroupContestService } from './group-contest.service'
import { GroupContestResolver } from './group-contest.resolver'
import { PrismaService } from '../prisma.service'

@Module({
  providers: [GroupContestResolver, GroupContestService, PrismaService],
})
export class GroupContestModule {}
