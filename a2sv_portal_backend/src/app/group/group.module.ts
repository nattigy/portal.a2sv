import { Module } from '@nestjs/common'
import { GroupRepository } from './group.repository'
import { GroupResolver } from './group.resolver'
import { GroupService } from './group.service'

@Module({
  providers: [GroupRepository, GroupResolver, GroupService],
  exports: [GroupService],
})
export class GroupModule {}
