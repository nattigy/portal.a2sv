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
import { UserProfile } from 'src/user-profile/entities/user-profile.entity'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { GetUserArgs } from './dto/get-users.args'
import { Roles } from 'src/auth/auth.decorator'
import { GroupsService } from 'src/group/groups.service'
import { Group } from 'src/group/entities/group.entity'
import { GroupTopicSeasonProblemUser } from '../group-topic-season-problem-user/entities/group-topic-season-problem-user.entity'
import { UserTopic } from '../user-topic/entities/user-topic.entity'
import { ComfortLevel } from './entities/comfort-level.enum'

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly groupService: GroupsService,
  ) {}

  @Mutation(() => User)
  async updateComfortLevel(
    @Args('topicId', { type: () => Int }) topicId: number,
    @Args('userId', { type: () => Int }) userId: number,
    @Args('comfortLevel', { type: () => ComfortLevel })
    comfortLevel: ComfortLevel,
  ) {
    try {
      return await this.userService.updateComfortLevel(
        topicId,
        userId,
        comfortLevel,
      )
    } catch (e) {
      console.log(e)
      return e.message
    }
  }

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION')
  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    try {
      return await this.userService.create(createUserInput)
    } catch (e) {
      console.log(e)
      return e.message
    }
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Query(() => [User], { name: 'users' })
  async findAll(@Args() args: GetUserArgs) {
    try {
      return await this.userService.findAll(args)
    } catch (e) {
      console.log(e)
      return e.message
    }
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    // const {...needed, password} = user
    try {
      return await this.userService.findOne(id)
    } catch (e) {
      console.log(e)
      return e.message
    }
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    try {
      return await this.userService.update(updateUserInput)
    } catch (e) {
      console.log(e)
      return e.message
    }
  }

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION')
  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    try {
      return await this.userService.remove(id)
    } catch (e) {
      console.log(e)
      return e.message
    }
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @ResolveField()
  async group(@Parent() user: User) {
    try {
      const { groupId } = user
      return this.groupService.getGroupById(groupId)
    } catch (e) {
      console.error(e)
      return e.message
    }
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @ResolveField(() => UserProfile)
  userProfile(@Parent() user: User): UserProfile {
    try {
      return user.userProfile
    } catch (e) {
      console.error(e)
      return e.message
    }
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @ResolveField(() => Group)
  headToGroup(@Parent() user: User): Group {
    return user.headToGroup
  }

  @Roles(
    'ADMIN',
    'HEAD_OF_ACADEMY',
    'HEAD_OF_EDUCATION',
    'ASSISTANT',
    'STUDENT',
  )
  @ResolveField(() => [GroupTopicSeasonProblemUser])
  groupTopicProblems(@Parent() user: User): GroupTopicSeasonProblemUser[] {
    return user.groupTopicSeasonProblems
  }

  @ResolveField(() => [UserTopic])
  topics(@Parent() user: User): UserTopic[] {
    return user.topics
  }
}
