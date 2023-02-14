import { Module } from '@nestjs/common'
import { UserProfileRepository } from './user-profile.repository'
import { UserProfileService } from './user-profile.service'
import { UserProfileResolver } from './user-profile.resolver'
import { StorageModule } from 'src/storage/storage.module'
import { UserModule } from '../user/user.module'

@Module({
  providers: [UserProfileRepository, UserProfileResolver, UserProfileService],
  imports: [StorageModule, UserModule],
})
export class UserProfileModule {}
