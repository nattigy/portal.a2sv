import { Module } from '@nestjs/common';
import { SeasonContestService } from './season-contest.service';
import { SeasonContestResolver } from './season-contest.resolver';

@Module({
  providers: [SeasonContestResolver, SeasonContestService]
})
export class SeasonContestModule {}
