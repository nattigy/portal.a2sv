import { Module } from '@nestjs/common'
import { UserSeasonContestService } from 'src/user-relations/user-season-contest/user-season-contest.service'
import { GroupsService } from '../group-relations/group/groups.service'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { UserRepository } from './user.repository'

@Module({
  providers: [
    UserRepository,
    UserResolver,
    UserService,
    GroupsService,
    UserSeasonContestService,
  ],
  exports: [UserService],
})
export class UserModule {}
