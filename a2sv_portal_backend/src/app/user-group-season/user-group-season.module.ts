import { Module } from '@nestjs/common'
import { UserGroupSeasonRepository } from './user-group-season.repository'
import { UserGroupSeasonService } from './user-group-season.service'

@Module({
  providers: [UserGroupSeasonRepository,UserGroupSeasonService],
  exports: [UserGroupSeasonRepository, UserGroupSeasonService],
})
export class UserGroupSeasonModule {}
