import { Module } from '@nestjs/common'
import { UserProfileRepository } from './user-profile.repository'
import { UserProfileService } from './user-profile.service'
import { UserProfileResolver } from './user-profile.resolver'

@Module({
  providers: [UserProfileRepository, UserProfileResolver, UserProfileService],
})
export class UserProfileModule {}
