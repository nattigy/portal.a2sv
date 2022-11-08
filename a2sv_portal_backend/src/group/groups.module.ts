import { Module } from '@nestjs/common'
import { CaslModule } from '../casl/casl.module'
import { GroupsResolver } from './groups.resolver'
import { GroupsService } from './groups.service'
import { PrismaService } from '../prisma.service'

@Module({
  providers: [GroupsResolver, GroupsService, PrismaService, CaslModule],
})
export class GroupsModule {}
