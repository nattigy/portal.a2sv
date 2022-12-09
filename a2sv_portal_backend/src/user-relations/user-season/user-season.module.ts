import { Module } from '@nestjs/common'
import { UserSeasonService } from './user-season.service'
import { UserSeasonResolver } from './user-season.resolver'
import { UserSeasonRepository } from './user-season.repository'

@Module({
  providers: [UserSeasonRepository, UserSeasonResolver, UserSeasonService],
})
export class UserSeasonModule {}
