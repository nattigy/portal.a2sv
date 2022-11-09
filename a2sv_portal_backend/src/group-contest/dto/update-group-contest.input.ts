import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateGroupContestInput } from './create-group-contest.input'

@InputType()
export class UpdateGroupContestInput extends PartialType(
  CreateGroupContestInput,
) {
  @Field(() => String)
  groupId: string
  @Field(() => String)
  contestId: string
}
