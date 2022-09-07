import { InputType, Int, Field } from '@nestjs/graphql'
import { PartialType } from '@nestjs/mapped-types'
import { UserProfile } from '../entities/user-profile.entity'

@InputType()
export class CreateUserProfileInput extends PartialType(UserProfile) {
  @Field(() => Int)
  userId: number
}
