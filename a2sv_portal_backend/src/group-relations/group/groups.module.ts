import { Module } from '@nestjs/common'
import { GroupsResolver } from './groups.resolver'
import { GroupsService } from './groups.service'
import { GroupRepository } from './group.repository'

@Module({
  providers: [GroupRepository, GroupsResolver, GroupsService],
})
export class GroupsModule {
}
