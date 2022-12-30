import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateSeasonContestInput {
  @Field({ description: 'Example field' })
  seasonId: string

  @Field({ description: 'Example field' })
  contestId: string
}

@InputType()
export class SeasonContestId {
  @Field({ description: 'Example field' })
  seasonId: string

  @Field({ description: 'Example field' })
  contestId: string
}
