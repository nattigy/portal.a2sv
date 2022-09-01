import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { User } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'
import { CreateUserInput } from '../user/dto/create-user.input'
import { LoginOutput } from './dto/login-output.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email)
    if (user && user.password === pass) {
      return user
    }
    return null
  }

  async getUser(id: number): Promise<User | null> {
    const user = await this.usersService.findById(id)
    if (user) {
      return user
    }
    return null
  }

  async login(user: User): Promise<{ accessToken: string; userId: number }> {
    const payload = { email: user.email, sub: user.id }
    return {
      userId: user.id,
      accessToken: this.jwtService.sign(payload),
    }
  }

  async signUp(createUserInput: CreateUserInput): Promise<{ userId: number }> {
    const user = await this.usersService.create(createUserInput)
    return {
      userId: user.id,
    }
  }
}
