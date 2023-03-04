import { Module } from '@nestjs/common'
import { UserGroupSeasonContestModule } from '../../app/user-group-season-contest/user-group-season-contest.module'
import { UserGroupSeasonContestProblemModule } from '../../app/user-group-season-contest-problem/user-group-season-contest-problem.module'

@Module({
  imports: [
    UserGroupSeasonContestModule,
    UserGroupSeasonContestProblemModule,
    // UserGroupSeasonModule,
    // ManageUserGroupSeasonsModule
  ],
  providers: [
    // UserUpdateContestProblemResolver,
    // UserUpdateContestProblemService
  ],
})
export class UserUpdateContestProblemModule {}
