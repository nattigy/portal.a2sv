import { CreateGroupSeasonInput } from './create-group-season.input'
import { Field, InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateGroupSeasonInput extends PartialType(CreateGroupSeasonInput) {
  @Field()
  groupId: string

  @Field()
  seasonId: string
}
