import { Module } from '@nestjs/common'
import { GroupSeasonRepository } from './group-season.repository'

@Module({
  providers: [GroupSeasonRepository],
  exports: [GroupSeasonRepository]
})
export class GroupSeasonModule {}
