import { Module } from '@nestjs/common'
import { UserContestService } from 'src/user-contest/user-contest.service'
import { GroupsService } from '../group/groups.service'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  providers: [UserResolver, UserService, GroupsService,UserContestService],
  exports: [UserService],
})
export class UserModule {}
