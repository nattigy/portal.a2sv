import { Module } from '@nestjs/common'
import { GroupsService } from '../group/groups.service'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  providers: [UserResolver, UserService, GroupsService],
  exports: [UserService],
})
export class UserModule {}
