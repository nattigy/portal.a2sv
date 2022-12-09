import { Module } from '@nestjs/common'
import { GroupSeasonService } from './group-season.service'
import { GroupSeasonResolver } from './group-season.resolver'
import { GroupSeasonRepository } from './group-season.repository'

@Module({
  providers: [GroupSeasonRepository, GroupSeasonResolver, GroupSeasonService],
})
export class GroupSeasonModule {}
