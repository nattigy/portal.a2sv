import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser, Public } from './auth.decorator'
import { AuthService } from './auth.service'
import { LoginInput } from './dto/login-input.dto'
import { AuthResponse } from './dto/auth-response.dto'
import { JwtAuthGuard } from './guards/jwt-auth-guard.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { User } from '../app/user/entities/user.entity'
import { CreateUserInput } from '../app/user/dto/create-user.input'

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

  @Mutation(() => String)
  async forgotPassword(@Args('email') email: string): Promise<string> {
    return await this.authService.forgotPassword(email)
  }

  @Mutation(() => String)
  async resetPassword(@Args('resetToken') resetToken: string, @Args('password') pass: string) {
    return this.authService.resetPassword(resetToken, pass)
  }

  @Mutation(() => String)
  async resendOtp(@Args('email') email:string) {
    return this.authService.resendOtp(email);
  }

  @Mutation(() => AuthResponse)
  @Mutation(() => User)

  async validateOtp(
    @Args('otpCode') otpCode: number,
    @Args('email') email: string,
    @Context() context,
  ): Promise<AuthResponse> {
    return this.authService.verifyOtp(context, otpCode, email)
  }

  @Mutation(() => String)
  async signUp(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<String | null> {
    return await this.authService.signUp(createUserInput)
  }

  // @Public()
  // @Mutation(() => AuthResponse)
  // async signUp(
  //   @Args('createUserInput') createUserInput: SignUpUserInput,
  //   @Context() context,
  // ): Promise<AuthResponse> {
  //   return this.authService.signUp(context, createUserInput)
  // }

  // @Mutation(() => Int)
  // async logout(@Context('res') response: Response) {
  //   await this.authService.logout(response)
  //   return 1
  // }

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  getMe(@CurrentUser() user: User): User {
    return user
  }
}
