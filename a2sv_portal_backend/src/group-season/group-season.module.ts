import { Module } from '@nestjs/common'
import { GroupSeasonService } from './group-season.service'
import { GroupSeasonResolver } from './group-season.resolver'

@Module({
  providers: [GroupSeasonResolver, GroupSeasonService],
})
export class GroupSeasonModule {}
