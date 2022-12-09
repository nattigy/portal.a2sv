import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { PoliciesGuard } from '../casl/policy/policy.guard'
import { UserModule } from '../user-relations/user/user.module'
import { jwtConstants } from './auth.constants'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth-guard.service'
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
    LocalStrategy,
    JwtStrategy,
    AuthResolver,
    AuthService,
    // {
    //   provide: 'APP_GUARD',
    //   useClass: JwtAuthGuard,
    // },
    // {
    //   provide: 'APP_GUARD',
    //   useClass: PoliciesGuard,
    // },
  ],
})
export class AuthModule {}
