import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FindGroupContestInput {
  @Field(() => String, { nullable: true })
  groupId?: string
  @Field(() => String, { nullable: true })
  contestId?: string
}
