import { Module } from '@nestjs/common'
import { GroupRepository } from './group.repository'
import { GroupsResolver } from './groups.resolver'
import { GroupsService } from './groups.service'

@Module({
  providers: [GroupRepository, GroupsResolver, GroupsService],
})
export class GroupModule {}
