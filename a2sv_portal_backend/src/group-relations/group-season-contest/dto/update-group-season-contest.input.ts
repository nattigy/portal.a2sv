import { CreateGroupSeasonContestInput } from './create-group-season-contest.input'
import { Field, InputType, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateGroupSeasonContestInput extends PartialType(CreateGroupSeasonContestInput) {
  @Field(() => Int)
  id: number
}
