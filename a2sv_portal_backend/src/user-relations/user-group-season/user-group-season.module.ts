import { Module } from '@nestjs/common'
import { UserGroupSeasonService } from './user-group-season.service'
import { UserGroupSeasonResolver } from './user-group-season.resolver'
import { UserGroupSeasonRepository } from './user-group-season.repository'

@Module({
  providers: [UserGroupSeasonRepository, UserGroupSeasonResolver, UserGroupSeasonService],
})
export class UserGroupSeasonModule {}
