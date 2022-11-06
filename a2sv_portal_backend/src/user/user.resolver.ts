import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
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
import { UserTopic } from '../user-topic/entities/user-topic.entity'
import { ComfortLevel } from './entities/comfort-level.enum'
import { SeasonTopicProblemUser } from '../season-topic-problem-user/entities/season-topic-problem-user.entity'
import { PageInfoInput } from '../common/page/page-info.input'
import { UsersPage } from '../common/page/page-info'
import {
  StudentStat,
  TopicCoverageStat,
  TopicStudentStatInput,
} from './dto/user-dtos'

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly groupService: GroupsService,
  ) {}

  @Mutation(() => User, {
    description: `
  Arguments\n
  - topicId : An id of the topic which the user is updating their comfort level on.\n
  - userId :  An id of the user updating their comfort level.\n
  - comfortLevel : The user's comfort level on the current topic.\n
  Example \n
  mutation Mutation($comfortLevel: ComfortLevel!, $topicId: String!, $userId: String!) \n
    {\n
      updateComfortLevel(comfortLevel: $comfortLevel, topicId: $topicId, userId: $userId)
        {
          topics 
            {
              topic 
                {
                  id
                  name
                }
              comfortLevel
            }
        }
    }
  Input \n
    {  
      "comfortLevel":  UNCOMFORTABLE,
      "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
      "userId": userId: "a9531ef8-0f0d-4d37-b16d-ba0ce049df13"
    }
  Return \n
    {\n
      "data": 
        {
          "updateComfortLevel":
            {
              "topics":
                [
                  {
                    "topic":
                      {
                        "id": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
                        "name": "BFS"
                      },
                    "comfortLevel": "UNCOMFORTABLE"
                  }
                ]
            }
        }
    }
  
  `,
  })
  async updateComfortLevel(
    @Args('topicId', { type: () => String }) topicId: string,
    @Args('userId', { type: () => String }) userId: string,
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
  @Mutation(() => User,{
    description:`
    Creates a user\n
    Arguments\n
    - email: email of the user we want to register to the system\n
    - password: passowrd for the account\n
    mutation CreateUser($createUserInput: CreateUserInput!) \n
      {\n
        createUser(createUserInput: $createUserInput) 
          {
            email
            id
          }
      }\n
    Input\n
      {\n
        "createUserInput":
          {
            "email":"sync@a2sv.org",
            "password": "123456789"
          }
      }
    Return\n
      {\n
        "data": 
          {
            "createUser": 
              {
                "email": "sync@a2sv.org",
                "id": "8a17f9cb-b175-44f5-94d3-17ac9ee4f3f1"
              }
          }
      }
    `
  })
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
  @Query(() => UsersPage<User>, { name: 'users' })
  async findAll(
    @Args() args: GetUserArgs,
    @Args('pageInfoInput', { type: () => PageInfoInput, nullable: true })
    pageInfoInput?: PageInfoInput,
  ) {
    try {
      return await this.userService.findAll(args, pageInfoInput)
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
  @Query(() => User, { name: 'user' , description:`
    Returns a user data  filtred by id\n
    Argument\n
    - id: id of the user \n
    Example\n
    query UserProfile($userId: String!) \n
      {\n
        user(id: $userId)
          {
            email
            id
            userProfile 
              {
                firstName
                lastName
              }
          }
      }
    Input\n
      {
        "userId": "8a17f9cb-b175-44f5-94d3-17ac9ee4f3f1"
      }
    Return\n
      {\n
        "data": 
          {
            "user": 
              {
                "email": "sync@a2sv.org",
                "id": "8a17f9cb-b175-44f5-94d3-17ac9ee4f3f1",
                "userProfile":
                  {
                    "firstName": "Sinkumen",
                    "lastName": "Assefa"
                  }
              }
          }
      }
    `})
  async findOne(@Args('id', { type: () => String }) id: string) {
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
  @Mutation(() => User, {description:`
    updates the user data\n
    Argument\n
    - a data the user wants to update\n
    Example\n
    mutation UpdateUser($updateUserInput: UpdateUserInput!) \n
      {\n
        updateUser(updateUserInput: $updateUserInput) 
          {
            id
            email
          }
      }
    Input\n
    {\n
      "updateUserInput": 
        {
          "userProfile": 
            {
              "firstName": "Sinkumen",
              "lastName": "Assefa"
            },
            "id": "8a17f9cb-b175-44f5-94d3-17ac9ee4f3f1"
        }
    }
    `})
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    try {
      return await this.userService.update(updateUserInput)
    } catch (e) {
      console.log(e)
      return e.message
    }
  }

  @Roles('ADMIN', 'HEAD_OF_ACADEMY', 'HEAD_OF_EDUCATION')
  @Mutation(() => User, {description:`
  Deletes a user\n
  Argument\n
    - id: id of the user \n
  Example\n
  mutation Mutation($removeUserId: String!)\n 
    {\n
      removeUser(id: $removeUserId) 
        {
          id
        }
    }
  Input\n
    {\n
      "removeUserId": "8a17f9cb-b175-44f5-94d3-17ac9ee4f3f1"
    }
  `})
  async removeUser(@Args('id', { type: () => String }) id: string) {
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
  @ResolveField(() => [SeasonTopicProblemUser])
  seasonTopicProblems(@Parent() user: User): SeasonTopicProblemUser[] {
    return user.seasonTopicProblems
  }

  @ResolveField(() => [UserTopic])
  topics(@Parent() user: User): UserTopic[] {
    return user.topics
  }

  @Query(() => StudentStat)
  studentStats(@Args('id', { type: () => String }) id: string) {
    return this.userService.studentStats(id)
  }

  @Query(() => TopicCoverageStat)
  topicStudentStats(
    @Args('topicStudentStateInput', { type: () => TopicStudentStatInput })
    topicStudentStatInput: TopicStudentStatInput,
  ) {
    return this.userService.studentTopicStats(topicStudentStatInput)
  }
}
