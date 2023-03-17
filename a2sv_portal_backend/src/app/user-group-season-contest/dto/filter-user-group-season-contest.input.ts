import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FilterUserGroupSeasonContestInput {
  @Field({ nullable: true })
  contestId?: string

  @Field({ nullable: true })
  seasonId?: string

  @Field({ nullable: true })
  userId?: string
}
