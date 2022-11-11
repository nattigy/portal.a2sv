import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FilterUserContestInput {
  @Field({ nullable: true })
  contestId?: string
  @Field({ nullable: true })
  userId?: string
}
