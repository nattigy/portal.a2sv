import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { User as UserModel } from '@prisma/client'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { Role } from '../roles/entities/role.entity'
import { GetUserArgs } from './dto/get-users.args'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput)
  }

  @Query(() => [User], { name: 'users' })
  async findAll(@Args() args: GetUserArgs) {
    return await this.userService.findAll(args)
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    // const {...needed, password} = user
    return await this.userService.findOne(id)
  }

  @ResolveField(() => Role)
  async role(@Parent() user: UserModel): Promise<Role> {
    return this.userService.getRole(user)
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.userService.update(updateUserInput.id, updateUserInput)
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.remove(id)
  }
}
