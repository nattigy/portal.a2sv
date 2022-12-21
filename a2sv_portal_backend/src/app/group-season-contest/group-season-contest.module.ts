import { Module } from '@nestjs/common'
import { GroupSeasonContestRepository } from './group-season-contest.repository'

@Module({
  providers: [GroupSeasonContestRepository],
})
export class GroupSeasonContestModule {
}
