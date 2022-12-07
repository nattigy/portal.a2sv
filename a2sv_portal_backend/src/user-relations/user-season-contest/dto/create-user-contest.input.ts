import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserContestInput {
  @Field()
  contestId: string

  @Field(() => String)
  userId: string
}
