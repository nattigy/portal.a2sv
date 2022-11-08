import { Module } from '@nestjs/common'
import { CaslModule } from '../casl/casl.module'
import { UserProfileService } from './user-profile.service'
import { UserProfileResolver } from './user-profile.resolver'
import { PrismaService } from 'src/prisma.service'

@Module({
  providers: [
    UserProfileResolver,
    UserProfileService,
    PrismaService,
    CaslModule,
  ],
})
export class UserProfileModule {}
