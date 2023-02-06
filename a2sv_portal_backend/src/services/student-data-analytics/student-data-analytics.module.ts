import { Module } from '@nestjs/common';
import { StudentDataAnalyticsService } from './student-data-analytics.service';
import { StudentDataAnalyticsResolver } from './student-data-analytics.resolver';

@Module({
  providers: [StudentDataAnalyticsResolver, StudentDataAnalyticsService]
})
export class StudentDataAnalyticsModule {}
