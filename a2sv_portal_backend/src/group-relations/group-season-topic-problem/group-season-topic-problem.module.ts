import { Module } from '@nestjs/common';
import { GroupSeasonTopicProblemService } from './group-season-topic-problem.service';
import { GroupSeasonTopicProblemResolver } from './group-season-topic-problem.resolver';
import { GroupSeasonTopicProblemRepository } from './group-season-topic-problem.repository';

@Module({
  providers: [GroupSeasonTopicProblemRepository, GroupSeasonTopicProblemResolver, GroupSeasonTopicProblemService],
  exports: [GroupSeasonTopicProblemRepository]
})
export class GroupSeasonTopicProblemModule {}
