import { Module } from '@nestjs/common'
import { CaslModule } from '../casl/casl.module'
import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { AuthResolver } from './auth.resolver'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './auth.constants'
import { GqlAuthGuard } from './guards/gql-auth.guard'
import { RolesGuard } from './guards/role.guard'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    CaslModule,
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
