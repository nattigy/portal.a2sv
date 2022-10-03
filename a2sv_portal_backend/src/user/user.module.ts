import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { GroupsService } from 'src/group/groups.service'
import { PrismaService } from '../prisma.service'

@Module({
  providers: [UserResolver, UserService, PrismaService, GroupsService],
  exports: [UserService],
})
export class UserModule {}
