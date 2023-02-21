import { Module } from '@nestjs/common'
import { ContestStatsService } from './contest-stats.service'
import { ContestStatsResolver } from './contest-stats.resolver'

@Module({
  providers: [ContestStatsResolver, ContestStatsService],
})
export class ContestStatsModule {}
