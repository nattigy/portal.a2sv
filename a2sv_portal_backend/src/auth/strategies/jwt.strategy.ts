import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from '../../app/user/entities/user.entity'
import { jwtConstants } from '../auth.constants'
import { AuthService } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return request.cookies?.Authentication
            ? request.cookies.Authentication
            : request.headers.authorization?.split(' ')[1]
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    })
  }

  async validate(payload: any): Promise<User | undefined> {
    return this.authService.getUser(payload.sub)
  }
}
