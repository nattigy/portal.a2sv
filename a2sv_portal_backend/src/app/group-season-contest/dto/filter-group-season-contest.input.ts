import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FilterGroupSeasonContestInput {
  @Field({ nullable: true, description: 'Example field (placeholder)' })
  groupId?: string

  @Field({ nullable: true, description: 'Example field (placeholder)' })
  seasonId?: string

  @Field({ nullable: true, description: 'Example field (placeholder)' })
  contestId?: string
}
