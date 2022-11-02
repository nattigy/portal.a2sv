import { CreateGroupContestInput } from './create-group-contest.input'
import { Field, InputType, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateGroupContestInput extends PartialType(
  CreateGroupContestInput,
) {
  @Field(() => Int)
  id: number
}
