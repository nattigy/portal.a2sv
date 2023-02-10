import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { BadRequestException } from '@nestjs/common'
import { PaginationUser } from '../../common/page/pagination-info'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'
import { UserService } from './user.service'
import { FilterUserInput, UniqueUserInput } from './dto/filter-user-input'
import descriptions from './user.doc'
import { PaginationInput } from '../../common/page/pagination.input'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(UserAbilities.create)
  // @Mutation(() => User, {
  //   description: descriptions.createUser,
  // })
  // async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
  //   return this.userService.createUser(createUserInput)
  // }

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(UserAbilities.read)
  @Query(() => PaginationUser)
  async users(
    @Args('filterUserInput', { nullable: true }) filterUserInput?: FilterUserInput,
    @Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
  ): Promise<PaginationUser> {
    try {
      return this.userService.users(filterUserInput, paginationInput)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Error loading users!')
    }
  }

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(UserAbilities.read)
  @Query(() => User, { description: descriptions.findOne })
  async user(@Args('uniqueUserInput') uniqueUserInput: UniqueUserInput) {
    try {
      return this.userService.user(uniqueUserInput)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Error loading user!')
    }
  }

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(UserAbilities.update)
  @Mutation(() => User, { description: descriptions.updateUser })
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    try {
      return this.userService.updateUser(updateUserInput)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Error updating user!')
    }
  }

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(UserAbilities.update)
  @Mutation(() => Int, { description: descriptions.updateUser })
  async addUsersToAGroup(
    @Args('groupId') groupId: string,
    @Args('studentIds', { type: () => [String] }) studentIds: string[],
  ) {
    try {
      return this.userService.updateUser(studentIds.map(userId => ({ userId, groupId })))
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Error adding users to a group!')
    }
  }

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(UserAbilities.update)
  @Mutation(() => Int, { description: descriptions.updateUser })
  async removeUsersFromAGroup(
    @Args('groupId') groupId: string,
    @Args('studentIds', { type: () => [String] }) studentIds: string[],
  ) {
    try {
      return this.userService.removeUsersFromAGroup(
        studentIds.map(userId => ({ userId, groupId })),
      )
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Error adding users to a group!')
    }
  }

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(UserAbilities.delete)
  @Mutation(() => Int, { description: descriptions.deleteUser })
  async removeUser(@Args('userId') userId: string) {
    try {
      return this.userService.removeUser(userId)
    } catch (e) {
      console.error('Error: ', e)
      throw new BadRequestException('Error removing user!')
    }
  }
}
