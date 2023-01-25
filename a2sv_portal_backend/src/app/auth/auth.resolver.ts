import { BadRequestException, UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser, Public } from './auth.decorator'
import { AuthService } from './auth.service'
import { LoginInput } from './dto/login-input.dto'
import { AuthResponse } from './dto/auth-response.dto'
import { JwtAuthGuard } from './guards/jwt-auth-guard.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { User } from '../user/entities/user.entity'
import { ForgotResponse } from './dto/forgot-response'

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
    try {
      const { accessToken, userId } = await this.authService.login(context)
      return { accessToken, userId }
    } catch (e) {
      throw new BadRequestException('Error logging in!')
    }
  }

  @Public()
  @Mutation(() => ForgotResponse)
  async forgotPassword(@Args('email') email: string): Promise<ForgotResponse> {
    try {
      return await this.authService.forgotPassword(email)
    } catch (e) {
      console.log(e)
      throw new BadRequestException("User doesn't exit!")
    }
  }

  @Mutation(() => String)
  async resetPassword(@Args('resetToken') resetToken: string, @Args('password') pass: string) {
    try {
      return this.authService.resetPassword(resetToken, pass)
    } catch (e) {
      throw new BadRequestException("User doesn't exit!")
    }
  }

  @Public()
  @Mutation(() => ForgotResponse)
  async resendOtp(@Args('email') email: string) {
    try {
      return this.authService.resendOtp(email)
    } catch (e) {
      throw new BadRequestException('Error resending OTP!')
    }
  }

  @Public()
  @Mutation(() => AuthResponse)
  @Mutation(() => User)
  async validateOtp(
    @Args('otpCode') otpCode: number,
    @Args('email') email: string,
    @Context() context,
  ): Promise<AuthResponse> {
    try {
      return this.authService.verifyOtp(context, otpCode, email)
    } catch (e) {
      throw new BadRequestException('Error validating OTP!')
    }
  }

  @Mutation(() => String)
  async createUser(@Args('email') email: string): Promise<String | null> {
    try {
      return await this.authService.signUp(email)
    } catch (e) {
      throw new BadRequestException('Error creating user!')
    }
  }

  @Public()
  @Query(() => Date)
  async checkOtpStatus(@Args('email') email: string): Promise<Date> {
    try {
      return await this.authService.checkOtpStatus(email)
    } catch (e) {
      console.log(e)
      throw new BadRequestException('Otp does not exit  for the User')
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  async changePassword(
    @CurrentUser() user: User,
    @Args('oldPassword') oldPass: string,
    @Args('newPassword') newPass: string,
  ): Promise<string> {
    try {
      return this.authService.changePassword(user, oldPass, newPass)
    } catch (e) {
      throw new BadRequestException('Error changing password!')
    }
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
    try {
      return user
    } catch (e) {
      throw new BadRequestException('Error loading user!')
    }
  }
}
