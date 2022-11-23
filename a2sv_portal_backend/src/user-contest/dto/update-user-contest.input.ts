import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateUserContestInput {
  @Field()
  contestId: string
  @Field()
  userId: string
}

@InputType()
export class UserContestId {
  @Field()
  contestId: string
  @Field()
  userId: string
}
