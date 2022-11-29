import { Injectable } from '@nestjs/common'
import { Context } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { Response } from 'express'
import { SignUpUserInput } from '../user/dto/sign-up-user.input'
import { UserService } from '../user/user.service'
import { AuthResponse } from './dto/auth-response.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email)
    if (user && bcrypt.compareSync(pass, user.password)) {
      return user
    }
    return null
  }

  async getUser(id: string): Promise<User | null> {
    const user = await this.usersService.findById(id)
    if (user) {
      return user
    }
    return null
  }

  async setToken(context, user): Promise<string> {
    const payload = { email: user.email, sub: user.id }
    const accessToken = this.jwtService.sign(payload)
    const expires = new Date()
    expires.setHours(expires.getHours() + 120)
    context.res.cookie('Authentication', accessToken, { httpOnly: true, expires })
    return accessToken
  }

  async login(@Context() context): Promise<AuthResponse> {
    const user = context.req.user
    const accessToken = await this.setToken(context, user)
    return { accessToken, userId: user.id }
  }

  async signUp(@Context() context, createUserInput: SignUpUserInput): Promise<AuthResponse> {
    const user = await this.usersService.create(createUserInput)
    const accessToken = await this.setToken(context, user)
    return { accessToken, userId: user.id }
  }

  async logout(@Context('res') response: Response) {
    response.cookie('Authentication', '', { httpOnly: true, expires: new Date() })
  }
}
