import { Module } from '@nestjs/common'
import { UserProfileRepository } from './user-profile.repository'
import { UserProfileService } from './user-profile.service'
import { UserProfileResolver } from './user-profile.resolver'
import { StorageModule } from 'src/storage/storage.module'

@Module({
  imports: [StorageModule],
  providers: [UserProfileRepository, UserProfileResolver, UserProfileService],
  exports: [UserProfileService],
})
export class UserProfileModule {}
