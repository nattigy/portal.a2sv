import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FilterGroupContestUsersInput {
  @Field({ nullable: true })
  contestId?: string

  @Field({ nullable: true })
  seasonId?: string

  @Field({ nullable: true })
  userId?: string
}
