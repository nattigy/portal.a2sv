import { UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GroupsService } from 'src/group/groups.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.service'
import { UserAbilities } from '../casl/handler/user-abilities.handler'
import { CheckPolicies } from '../casl/policy/policy.decorator'
import { PoliciesGuard } from '../casl/policy/policy.guard'
import { PaginationUser } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { SignUpUserInput } from './dto/sign-up-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'
import { UserService } from './user.service'
import { FilterUserInput } from './dto/filter-user-input'
import descriptions from './user.doc'

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly groupService: GroupsService,
  ) {
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.create)
  @Mutation(() => User, {
    description: descriptions.createUser,
  })
  async createUser(@Args('createUserInput') createUserInput: SignUpUserInput): Promise<User> {
    return this.userService.createUser(createUserInput)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.read)
  @Query(() => PaginationUser)
  async users(
    @Args('filterUserInput', { nullable: true })
      filterUserInput?: FilterUserInput,
    @Args('pageInfoInput', { nullable: true })
      pageInfoInput?: PaginationInfoInput,
  ): Promise<PaginationUser> {
    try {
      return this.userService.findAll(filterUserInput, pageInfoInput)
    } catch (e) {
      return e.message
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.read)
  @Query(() => User, { description: descriptions.findOne })
  async user(@Args('id') id: string) {
    try {
      return await this.userService.findOne(id)
    } catch (e) {
      return e.message
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.update)
  @Mutation(() => User, { description: descriptions.updateUser })
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.update)
  @Mutation(() => Int, { description: descriptions.updateUser })
  async addUsersToAGroup(
    @Args('groupId') groupId: string,
    @Args('studentIds', { type: () => [String] }) studentIds: string[],
  ) {
    return this.userService.update(studentIds.map(id => ({ id, groupId })))
  }

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(UserAbilities.read)
  // @Mutation(() => User, {
  //   description: descriptions.updateComfortLevel,
  // })
  // async updateComfortLevel(
  //   @Args('topicId', { type: () => String }) topicId: string,
  //   @Args('userId', { type: () => String }) userId: string,
  //   @Args('comfortLevel', { type: () => ComfortLevelEnum })
  //     comfortLevel: ComfortLevelEnum,
  // ) {
  //   try {
  //     return await this.userService.updateComfortLevel(topicId, userId, comfortLevel)
  //   } catch (e) {
  //     return e.message
  //   }
  // }

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(UserAbilities.read)
  // @Query(() => StudentStat)
  // studentStats(@Args('id', { type: () => String }) id: string) {
  //   return this.userService.studentStats(id)
  // }

  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies(UserAbilities.read)
  // @Query(() => TopicCoverageStat)
  // topicStudentStats(
  //   @Args('topicStudentStateInput', { type: () => TopicStudentStatInput })
  //     topicStudentStatInput: TopicStudentStatInput,
  // ) {
  //   return this.userService.studentTopicStats(topicStudentStatInput)
  // }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.delete)
  @Mutation(() => Int, { description: descriptions.deleteUser })
  async removeUser(@Args('userId') userId: string) {
    return this.userService.remove(userId)
  }
}
