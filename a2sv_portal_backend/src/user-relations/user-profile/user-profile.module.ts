import { Module } from '@nestjs/common'
import { UserProfileResolver } from './user-profile.resolver'
import { UserProfileService } from './user-profile.service'
import { UserProfileRepository } from './user-profile.repository'

@Module({
  providers: [UserProfileRepository, UserProfileResolver, UserProfileService],
})
export class UserProfileModule {}
