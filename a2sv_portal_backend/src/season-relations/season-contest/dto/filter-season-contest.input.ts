import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FilterSeasonContestInput {
  @Field({ nullable: true, description: 'Example field' })
  seasonId?: string

  @Field({ nullable: true, description: 'Example field' })
  contestId?: string
}