import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { PrismaService } from 'src/prisma/prisma.service'
import { GroupsService } from 'src/groups/groups.service'

@Module({
  providers: [UserResolver, UserService, PrismaService, GroupsService],
  exports: [UserService],
})
export class UserModule {}
