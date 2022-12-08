import { CreateUserSeasonInput } from './create-user-season.input'
import { Field, InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateUserSeasonInput extends PartialType(CreateUserSeasonInput) {
  @Field()
  userId: string

  @Field()
  seasonId: string
}
