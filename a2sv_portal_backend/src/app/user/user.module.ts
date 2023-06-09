import { Module } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  providers: [UserResolver, UserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}
