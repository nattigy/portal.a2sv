import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateGroupContestInput {
  @Field(() => String)
  groupId: string
  @Field(() => String)
  contestId: string
}
