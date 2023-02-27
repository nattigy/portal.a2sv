import { Module } from '@nestjs/common'
import { ManageGroupsResolver } from './manage-groups.resolver'
import { ManageGroupsService } from './manage-groups.service'
import { GroupModule } from '../../app/group/group.module'

@Module({
  imports: [GroupModule],
  providers: [ManageGroupsResolver, ManageGroupsService],
})
export class ManageGroupsModule {}
