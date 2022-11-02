import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FindGroupContestInput {
  @Field(() => String)
  groupId: string
  @Field(() => String)
  contestId: string
}
