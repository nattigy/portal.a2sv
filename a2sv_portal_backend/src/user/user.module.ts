import { Module } from '@nestjs/common'
import { UserSeasonContestService } from 'src/user-season-contest/user-season-contest.service'
import { GroupsService } from '../group/groups.service'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  providers: [UserResolver, UserService, GroupsService, UserSeasonContestService],
  exports: [UserService],
})
export class UserModule {}
