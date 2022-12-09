import { Module } from '@nestjs/common'
import { SeasonContestService } from './season-contest.service'
import { SeasonContestResolver } from './season-contest.resolver'
import { SeasonContestRepository } from './season-contest.repository'

@Module({
  providers: [SeasonContestRepository, SeasonContestResolver, SeasonContestService],
})
export class SeasonContestModule {}
