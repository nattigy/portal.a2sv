import { Module } from '@nestjs/common';
import { TopicProblemService } from './topic_problem.service';
import { TopicProblemController } from './topic_problem.controller';

@Module({
  controllers: [TopicProblemController],
  providers: [TopicProblemService]
})
export class TopicProblemModule {}
