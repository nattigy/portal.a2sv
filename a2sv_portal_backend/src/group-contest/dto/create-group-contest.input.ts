import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateGroupContestInput {
  @Field(() => String)
  groupId: string
  @Field(() => String)
  contestId: string
}
