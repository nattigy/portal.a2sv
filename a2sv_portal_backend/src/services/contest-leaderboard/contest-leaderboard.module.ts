import { Module } from '@nestjs/common'
import { ContestLeaderboardService } from './contest-leaderboard.service'
import { ContestLeaderboardResolver } from './contest-leaderboard.resolver'

@Module({
  providers: [ContestLeaderboardResolver, ContestLeaderboardService],
})
export class ContestLeaderboardModule {}
