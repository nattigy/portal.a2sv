import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { User as UserModel } from '@prisma/client'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { GetUserArgs } from './dto/get-users.args'
import { Roles } from 'src/auth/auth.decorator'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Roles('admin', 'head_of_academy', 'head_of_education')
  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput)
  }

  @Roles('admin', 'head_of_academy', 'head_of_education', 'assistant')
  @Query(() => [User], { name: 'users' })
  async findAll(@Args() args: GetUserArgs) {
    return await this.userService.findAll(args)
  }

  @Roles('admin', 'head_of_academy', 'head_of_education', 'student')
  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    // const {...needed, password} = user
    return await this.userService.findOne(id)
  }

  @Roles('admin', 'head_of_academy', 'head_of_education')
  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.userService.update(updateUserInput.id, updateUserInput)
  }

  @Roles('admin', 'head_of_academy', 'head_of_education')
  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.remove(id)
  }
}
