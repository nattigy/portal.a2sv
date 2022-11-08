import { Module } from '@nestjs/common'
import { CaslModule } from '../casl/casl.module'
import { ContestService } from './contest.service'
import { ContestResolver } from './contest.resolver'
import { PrismaService } from '../prisma.service'

@Module({
  providers: [ContestResolver, ContestService, PrismaService, CaslModule],
})
export class ContestModule {}
