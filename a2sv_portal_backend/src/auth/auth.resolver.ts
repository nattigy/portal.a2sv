import { UseGuards } from '@nestjs/common'
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '../user-relations/user/entities/user.entity'
import { CurrentUser, Public } from './auth.decorator'
import { AuthService } from './auth.service'
import { LoginInput } from './dto/login-input.dto'
import { AuthResponse } from './dto/auth-response.dto'
import { JwtAuthGuard } from './guards/jwt-auth-guard.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { SignUpUserInput } from 'dist/src/user/dto/sign-up-user.input'
import { CreateUserInput } from './../user-relations/user/dto/create-user.input';


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
    return await this.authService.forgotPassword(email);
  }

  @Mutation(() => String)
  async resetPassword(@Args('reset_token') resettoken:string, @Args('password')pass: string) {
    return this.authService.resetPassword(resettoken, pass)
  }

  @Mutation(() => AuthResponse)
  @Mutation(() => User)
  async validatePassword(@Args('otpcode') otpcode: number,@Args('email') email: string, @Context() context):Promise<AuthResponse> {
     return this.authService.verifyOtp(context,otpcode,email)
  }

  @Mutation(() => String)
  async signUp( @Args('createUserInput') createUserInput: CreateUserInput): Promise<String|null>{
    return await this.authService.signUp(createUserInput);
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
