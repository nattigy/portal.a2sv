import { Module } from '@nestjs/common';
import { GroupSeasonContestProblemService } from './group-season-contest-problem.service';
import { GroupSeasonContestProblemResolver } from './group-season-contest-problem.resolver';

@Module({
  providers: [GroupSeasonContestProblemResolver, GroupSeasonContestProblemService]
})
export class GroupSeasonContestProblemModule {}
