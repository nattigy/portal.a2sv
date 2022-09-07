import { CreateUserInput } from './create-user.input'
import { InputType, Field, Int } from '@nestjs/graphql'
import { RoleEnum } from 'src/roles/interfaces/role.enum'
import { UpdateGroupInput } from 'src/groups/dto/update-group.input'
import { UpdateUserProfileInput } from 'src/user-profile/dto/update-user-profile.input'

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  id: number
  @Field(() => Int, { nullable: true })
  groupId?: number

  @Field({ nullable: true })
  email: string

  @Field({ nullable: true })
  password: string

  @Field(() => RoleEnum, { nullable: true })
  role: RoleEnum

  @Field(() => UpdateGroupInput, { nullable: true })
  group?: UpdateGroupInput

  @Field(() => UpdateUserProfileInput, { nullable: true })
  userProfile?: UpdateUserProfileInput
}
