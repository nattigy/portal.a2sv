import { CreateGroupUserGroupSeasonInput } from './create-group-user-season.input'
import { Field, InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateUserGroupSeasonInput extends PartialType(CreateGroupUserGroupSeasonInput) {
  @Field()
  userId: string

  @Field()
  seasonId: string

  @Field()
  groupId: string
}
