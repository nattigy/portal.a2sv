import { CreateUserProfileInput } from './create-user-profile.input'
import { InputType, Field, Int } from '@nestjs/graphql'
import { PartialType } from '@nestjs/mapped-types'

@InputType()
export class UpdateUserProfileInput extends PartialType(
  CreateUserProfileInput,
) {
  @Field(() => Int)
  id?: number
}
