import { Module } from '@nestjs/common'
import { ContestService } from './contest.service'
import { ContestResolver } from './contest.resolver'
import { PrismaService } from '../prisma.service'

@Module({
  providers: [ContestResolver, ContestService, PrismaService],
})
export class ContestModule {}
