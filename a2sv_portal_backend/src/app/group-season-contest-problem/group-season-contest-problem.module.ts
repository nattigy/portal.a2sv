import { Module } from '@nestjs/common'
import { GroupSeasonContestProblemRepository } from './group-season-contest-problem.repository'

@Module({
  providers: [GroupSeasonContestProblemRepository],
})
export class GroupSeasonContestProblemModule {}
