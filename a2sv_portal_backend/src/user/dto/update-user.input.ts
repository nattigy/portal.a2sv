import { InputType, Field, Int } from '@nestjs/graphql'
import { RoleEnum } from '@prisma/client'
import { UpdateUserProfileInput } from 'src/user-profile/dto/update-user-profile.input'
import { UpdateSeasonTopicProblemUserInput } from '../../season-topic-problem-user/dto/update-season-topic-problem-user.input'

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  id: string
  @Field(() => String, { nullable: true })
  groupId?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  password?: string

  @Field(() => RoleEnum, { nullable: true })
  role?: RoleEnum

  @Field(() => UpdateUserProfileInput, { nullable: true })
  userProfile?: UpdateUserProfileInput

  @Field(() => [UpdateSeasonTopicProblemUserInput], { nullable: true })
  seasonTopicProblems?: UpdateSeasonTopicProblemUserInput[]
}
