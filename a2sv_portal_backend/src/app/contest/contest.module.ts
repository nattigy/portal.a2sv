import { Module } from '@nestjs/common'
import { ContestResolver } from './contest.resolver'
import { ContestService } from './contest.service'
import { ContestRepository } from './contest.repository'

@Module({
  providers: [ContestRepository, ContestResolver, ContestService],
  exports:[ContestRepository, ContestService]
})
export class ContestModule {}
