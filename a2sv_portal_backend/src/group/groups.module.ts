import { Module } from '@nestjs/common'
import { GroupsResolver } from './groups.resolver'
import { GroupsService } from './groups.service'
import { PrismaService } from '../prisma.service'

@Module({
  providers: [GroupsResolver, GroupsService, PrismaService],
})
export class GroupsModule {}
