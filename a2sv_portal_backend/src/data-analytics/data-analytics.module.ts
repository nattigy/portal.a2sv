import { Module } from '@nestjs/common'
import { DataAnalyticsService } from './data-analytics.service'
import { DataAnalyticsResolver } from './data-analytics.resolver'

@Module({
  providers: [DataAnalyticsResolver, DataAnalyticsService],
})
export class DataAnalyticsModule {}
