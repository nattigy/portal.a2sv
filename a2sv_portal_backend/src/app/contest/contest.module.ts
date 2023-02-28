import { Module } from '@nestjs/common'
import { ContestResolver } from './contest.resolver'
import { ContestService } from './contest.service'
import { ContestRepository } from './contest.repository'

@Module({
  providers: [ContestRepository, ContestResolver, ContestService],
  exports: [ContestService, ContestRepository],
})
export class ContestModule {}
