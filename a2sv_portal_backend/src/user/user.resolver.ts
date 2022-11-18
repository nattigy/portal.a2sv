import { UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Group } from 'src/group/entities/group.entity'
import { GroupsService } from 'src/group/groups.service'
import { UserProfile } from 'src/user-profile/entities/user-profile.entity'
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.service'
import { UserAbilities } from '../casl/handler/user-abilities.handler'
import { CheckPolicies } from '../casl/policy/policy.decorator'
import { PoliciesGuard } from '../casl/policy/policy.guard'
import { PaginationUser } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { SeasonTopicUserProblem } from '../season-topic-user-problem/entities/season-topic-user-problem.entity'
import { UserTopic } from '../user-topic/entities/user-topic.entity'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { StudentStat, TopicCoverageStat, TopicStudentStatInput } from './dto/user-dtos'
import { ComfortLevelEnum } from './entities/comfort-level.enum'
import { User } from './entities/user.entity'
import { UserService } from './user.service'
import { FilterUserInput } from './dto/filter-user-input'
import descriptions from './user.doc'

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly groupService: GroupsService,
  ) {}

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.read)
  @Mutation(() => User, {
    description: descriptions.updateComfortLevel,
  })
  async updateComfortLevel(
    @Args('topicId', { type: () => String }) topicId: string,
    @Args('userId', { type: () => String }) userId: string,
    @Args('comfortLevel', { type: () => ComfortLevelEnum })
    comfortLevel: ComfortLevelEnum,
  ) {
    try {
      return await this.userService.updateComfortLevel(topicId, userId, comfortLevel)
    } catch (e) {
      return e.message
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.create)
  @Mutation(() => User, {
    description: descriptions.createUser,
  })
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    try {
      return await this.userService.create(createUserInput)
    } catch (e) {
      return e.message
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.read)
  @Query(() => PaginationUser)
  async users(
    @Args('filterUserInput', { type: () => FilterUserInput, nullable: true })
    filterUserInput?: FilterUserInput,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
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
  async user(@Args('id', { type: () => String }) id: string) {
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
    try {
      return await this.userService.update(updateUserInput)
    } catch (e) {
      return e.message
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.update)
  @Mutation(() => Int, { description: descriptions.updateUser })
  async addUsersToAGroup(
    @Args('groupId') groupId: string,
    @Args('studentIds', { type: () => [String] }) studentIds: string[],
  ) {
    try {
      for (const studentId of studentIds) {
        await this.userService.update({
          groupId,
          id: studentId,
        })
      }
      return studentIds.length
    } catch (e) {
      return e.message
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.delete)
  @Mutation(() => User, { description: descriptions.deleteUser })
  async removeUser(@Args('id', { type: () => String }) id: string) {
    try {
      return await this.userService.remove(id)
    } catch (e) {
      return e.message
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.read)
  @ResolveField()
  async group(@Parent() user: User) {
    try {
      const { groupId } = user
      return this.groupService.findOne(groupId)
    } catch (e) {
      return e.message
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.read)
  @ResolveField(() => UserProfile)
  userProfile(@Parent() user: User): UserProfile {
    try {
      return user.userProfile
    } catch (e) {
      return e.message
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.read)
  @ResolveField(() => Group)
  headToGroup(@Parent() user: User): Group {
    return user.headToGroup
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.read)
  @ResolveField(() => [SeasonTopicUserProblem])
  seasonTopicProblems(@Parent() user: User): SeasonTopicUserProblem[] {
    return user.seasonTopicProblems
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.read)
  @ResolveField(() => [UserTopic])
  topics(@Parent() user: User): UserTopic[] {
    return user.topics
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.read)
  @Query(() => StudentStat)
  studentStats(@Args('id', { type: () => String }) id: string) {
    return this.userService.studentStats(id)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.read)
  @Query(() => TopicCoverageStat)
  topicStudentStats(
    @Args('topicStudentStateInput', { type: () => TopicStudentStatInput })
    topicStudentStatInput: TopicStudentStatInput,
  ) {
    return this.userService.studentTopicStats(topicStudentStatInput)
  }
}
