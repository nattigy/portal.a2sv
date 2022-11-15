import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Response } from 'express'
import { CreateUserInput } from '../user/dto/create-user.input'
import { User } from '../user/entities/user.entity'
import { CurrentUser, Public } from './auth.decorator'
import { AuthService } from './auth.service'
import { LoginInput } from './dto/login-input.dto'
import { LoginOutput } from './dto/login-output.dto'
import { SignupOutput } from './dto/signup-output.dto'
import { JwtAuthGuard } from './guards/jwt-auth-guard.service'
import { LocalAuthGuard } from './guards/local-auth.guard'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => LoginOutput)
  @UseGuards(LocalAuthGuard)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context,
  ): Promise<LoginOutput> {
    const { accessToken, userId } = await this.authService.login(context)
    return { accessToken, userId }
  }

  @Public()
  @Mutation(() => SignupOutput)
  async signUp(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<SignupOutput> {
    return this.authService.signUp(createUserInput)
  }

  @Mutation(() => SignupOutput)
  async logout(@Context('res') response: Response): Promise<SignupOutput> {
    await this.authService.logout(response)
    return {
      userId: '-1',
    }
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  getMe(@CurrentUser() user: User): User {
    return user
  }
}
