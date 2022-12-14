import { CreateGroupUserSeasonInput } from './create-group-user-season.input'
import { Field, InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateUserGroupSeasonInput extends PartialType(CreateGroupUserSeasonInput) {
  @Field()
  userId: string

  @Field()
  seasonId: string

  @Field()
  groupId: string
}
