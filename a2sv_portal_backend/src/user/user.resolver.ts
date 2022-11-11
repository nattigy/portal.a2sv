import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Group } from 'src/group/entities/group.entity'
import { GroupsService } from 'src/group/groups.service'
import { UserProfile } from 'src/user-profile/entities/user-profile.entity'
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.service'
import { UserAbilities } from '../casl/handler/user-abilities.handler'
import { CheckPolicies } from '../casl/policy/policy.decorator'
import { PoliciesGuard } from '../casl/policy/policy.guard'
import { PaginationOutput } from '../common/page/pagination-info'
import { PaginationInfoInput } from '../common/page/pagination-info.input'
import { SeasonTopicProblemUser } from '../season-topic-problem-user/entities/season-topic-problem-user.entity'
import { UserTopic } from '../user-topic/entities/user-topic.entity'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { StudentStat, TopicCoverageStat, TopicStudentStatInput } from './dto/user-dtos'
import { ComfortLevelEnum } from './entities/comfort-level.enum'
import { User } from './entities/user.entity'
import { UserService } from './user.service'
import { FilterUserInput } from './dto/filter-user-input'

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly groupService: GroupsService,
  ) {}

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.read)
  @Mutation(() => User)
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

  @CheckPolicies(UserAbilities.create)
  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    try {
      return await this.userService.create(createUserInput)
    } catch (e) {
      return e.message
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.read)
  @Query(() => PaginationOutput<User>)
  async users(
    @Args('filterUserInput', { type: () => FilterUserInput, nullable: true })
    filterUserInput?: FilterUserInput,
    @Args('pageInfoInput', { type: () => PaginationInfoInput, nullable: true })
    pageInfoInput?: PaginationInfoInput,
  ): Promise<PaginationOutput<User>> {
    try {
      console.log("here")
      return this.userService.findAll(filterUserInput, pageInfoInput)
    } catch (e) {
      return e.message
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.read)
  @Query(() => User)
  async user(@Args('id', { type: () => String }) id: string) {
    try {
      return await this.userService.findOne(id)
    } catch (e) {
      return e.message
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.update)
  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    try {
      return await this.userService.update(updateUserInput)
    } catch (e) {
      return e.message
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(UserAbilities.delete)
  @Mutation(() => User)
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
  @ResolveField(() => [SeasonTopicProblemUser])
  seasonTopicProblems(@Parent() user: User): SeasonTopicProblemUser[] {
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
