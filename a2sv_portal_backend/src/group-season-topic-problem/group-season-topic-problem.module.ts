import { Module } from '@nestjs/common';
import { GroupSeasonTopicProblemService } from './group-season-topic-problem.service';
import { GroupSeasonTopicProblemResolver } from './group-season-topic-problem.resolver';

@Module({
  providers: [GroupSeasonTopicProblemResolver, GroupSeasonTopicProblemService]
})
export class GroupSeasonTopicProblemModule {}
