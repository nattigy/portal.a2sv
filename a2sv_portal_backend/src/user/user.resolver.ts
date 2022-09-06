import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { User as UserModel } from '@prisma/client'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { GetUserArgs } from './dto/get-users.args'
import { Roles } from 'src/auth/auth.decorator'
import { GroupsService } from 'src/groups/groups.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService, private readonly groupService: GroupsService) {}

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION')
  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput)
  }

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION', 'ASSISTANT')
  @Query(() => [User], { name: 'users' })
  async findAll(@Args() args: GetUserArgs) {
    return await this.userService.findAll(args)
  }

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION', 'ASSISTANT')
  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    // const {...needed, password} = user
    return await this.userService.findOne(id)
  }

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION', 'ASSISTANT')
  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.userService.update(updateUserInput.id, updateUserInput)
  }

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION')
  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.remove(id)
  }

  @ResolveField()
  async group(@Parent() user: User) {
    const { groupId } = user;
    return this.groupService.getGroupById(groupId)
  }
}
