import { Module } from '@nestjs/common';
import { GroupTopicProblemUserService } from './group-topic-problem-user.service';
import { GroupTopicProblemUserResolver } from './group-topic-problem-user.resolver';

@Module({
  providers: [GroupTopicProblemUserResolver, GroupTopicProblemUserService]
})
export class GroupTopicProblemUserModule {}
