import { Module } from '@nestjs/common'
import { SeasonContestService } from './season-contest.service'
import { SeasonContestResolver } from './season-contest.resolver'
import { SeasonContestRepository } from './season-contest.repository'
import { ContestModule } from '../contest/contest.module'

@Module({
  imports: [ContestModule],
  providers: [SeasonContestRepository, SeasonContestResolver, SeasonContestService],
  exports: [SeasonContestService, SeasonContestRepository],
})
export class SeasonContestModule {}
