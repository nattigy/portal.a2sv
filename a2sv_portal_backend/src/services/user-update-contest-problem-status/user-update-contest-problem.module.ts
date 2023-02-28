import { Module } from '@nestjs/common'
import { UserUpdateContestProblemService } from './user-update-contest-problem.service'
import { UserUpdateContestProblemResolver } from './user-update-contest-problem.resolver'
import { UserGroupSeasonContestModule } from '../../app/user-group-season-contest/user-group-season-contest.module'
import {
  UserGroupSeasonContestProblemModule,
} from '../../app/user-group-season-contest-problem/user-group-season-contest-problem.module'
import { UserGroupSeasonModule } from '../../app/user-group-season/user-group-season.module'
import { ManageUserGroupSeasonModule } from '../manage-user-group-season/manage-user-group-season.module'

@Module({
  imports: [
    UserGroupSeasonContestProblemModule,
    UserGroupSeasonModule,
    UserGroupSeasonContestModule,
    ManageUserGroupSeasonModule
  ],
  providers: [
    UserUpdateContestProblemResolver,
    UserUpdateContestProblemService
  ],
})
export class UserUpdateContestProblemModule {
}
