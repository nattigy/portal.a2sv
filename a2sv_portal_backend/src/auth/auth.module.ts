import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../user/user.module'
import { jwtConstants } from './auth.constants'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { GqlAuthGuard } from './guards/gql-auth.guard'
import { RolesGuard } from './guards/role.guard'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    AuthResolver,
    JwtStrategy,
    {
      provide: 'APP_GUARD',
      useClass: GqlAuthGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class AuthModule {}
