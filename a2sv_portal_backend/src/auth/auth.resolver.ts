import { UseGuards } from '@nestjs/common'
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Response } from 'express'
import { SignUpUserInput } from '../user-relations/user/dto/sign-up-user.input'
import { User } from '../user-relations/user/entities/user.entity'
import { CurrentUser, Public } from './auth.decorator'
import { AuthService } from './auth.service'
import { LoginInput } from './dto/login-input.dto'
import { AuthResponse } from './dto/auth-response.dto'
import { JwtAuthGuard } from './guards/jwt-auth-guard.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { UniqueUserInput } from 'dist/src/user/dto/filter-user-input'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => AuthResponse)
  @UseGuards(LocalAuthGuard)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context,
  ): Promise<AuthResponse> {
    const { accessToken, userId } = await this.authService.login(context)
    return { accessToken, userId }
  }

  async forgotPassword(@Args('email') email: UniqueUserInput): Promise<User | null>{
    return this.authService.forgotPassword(email)
  }

  async resetPassword(@Args('email') email: UniqueUserInput,pass:string){
    return this.authService.resetPassword(email, pass)
  }
  @Public()
  @Mutation(() => AuthResponse)
  async signUp(
    @Args('createUserInput') createUserInput: SignUpUserInput,
    @Context() context,
  ): Promise<AuthResponse> {
    return this.authService.signUp(context, createUserInput)
  }

  @Mutation(() => Int)
  async logout(@Context('res') response: Response) {
    await this.authService.logout(response)
    return 1
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  getMe(@CurrentUser() user: User): User {
    return user
  }
}
