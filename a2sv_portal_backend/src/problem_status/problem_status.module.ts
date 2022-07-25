import { Module } from '@nestjs/common';
import { ProblemStatusService } from './problem_status.service';
import { ProblemStatusController } from './problem_status.controller';

@Module({
  controllers: [ProblemStatusController],
  providers: [ProblemStatusService],
})
export class ProblemStatusModule {}
