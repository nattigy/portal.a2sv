import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { LoginInput } from './dto/login-input.dto'
import { CreateUserInput } from '../user/dto/create-user.input'
import { SignupOutput } from './dto/signup-output.dto'
import { LoginOutput } from './dto/login-output.dto'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from './guards/gql-auth.guard'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }

  @Mutation(() => LoginOutput)
  @UseGuards(GqlAuthGuard)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context,
  ): Promise<LoginOutput> {
    return this.authService.login(context.user)
  }

  @Mutation(() => SignupOutput)
  async signUp(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<SignupOutput> {
    return this.authService.signUp(createUserInput)
  }
}