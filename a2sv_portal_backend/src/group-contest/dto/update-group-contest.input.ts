import { CreateGroupContestInput } from './create-group-contest.input'
import { Field, InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateGroupContestInput extends PartialType(
  CreateGroupContestInput,
) {
  @Field(() => String)
  groupId: string
  @Field(() => String)
  contestId: string
}
