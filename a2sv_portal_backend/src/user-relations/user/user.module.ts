import { Module } from '@nestjs/common'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { UserRepository } from './user.repository'

@Module({
  providers: [UserRepository, UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {
}
