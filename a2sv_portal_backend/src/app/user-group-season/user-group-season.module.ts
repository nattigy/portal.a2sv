import { Module } from '@nestjs/common'
import { UserGroupSeasonRepository } from './user-group-season.repository'

@Module({
  providers: [UserGroupSeasonRepository],
  exports: [UserGroupSeasonRepository],
})
export class UserGroupSeasonModule {}
