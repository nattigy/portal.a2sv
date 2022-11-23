import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateUserProfileInput } from './create-user-profile.input'

@InputType()
export class UpdateUserProfileInput extends PartialType(CreateUserProfileInput) {
  @Field()
  id: string
  @Field(() => String)
  userId: string
}
