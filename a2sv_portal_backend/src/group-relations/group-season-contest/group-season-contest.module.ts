import { Module } from '@nestjs/common'
import { GroupSeasonContestService } from './group-season-contest.service'
import { GroupSeasonContestResolver } from './group-season-contest.resolver'
import { GroupSeasonContestRepository } from './group-season-contest.repository'

@Module({
  providers: [
    GroupSeasonContestRepository,
    GroupSeasonContestResolver,
    GroupSeasonContestService,
  ],
})
export class GroupSeasonContestModule {
}
