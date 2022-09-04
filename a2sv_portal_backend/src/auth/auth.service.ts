import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { User } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'
import { CreateUserInput } from '../user/dto/create-user.input'
import * as bcrypt from 'bcrypt'
import { Context } from '@nestjs/graphql'
import { Response } from 'express'

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

  async getUser(id: number): Promise<User | null> {
    const user = await this.usersService.findById(id)
    if (user) {
      return user
    }
    return null
  }

  async login(
    @Context() context,
  ): Promise<{ accessToken: string; userId: number }> {
    const user = context.req.user
    const payload = { email: user.email, sub: user.id }
    const accessToken = this.jwtService.sign(payload)
    const expires = new Date()
    expires.setHours(expires.getHours() + 120)
    context.res.cookie('Authentication', accessToken, { httpOnly: true })
    return { accessToken, userId: user.id }
  }

  async signUp(createUserInput: CreateUserInput): Promise<{ userId: number }> {
    const user = await this.usersService.create(createUserInput)
    return {
      userId: user.id,
    }
  }

  async logout(@Context('res') response: Response) {
    response.cookie('Authentication', '', { expires: new Date() })
  }
}
