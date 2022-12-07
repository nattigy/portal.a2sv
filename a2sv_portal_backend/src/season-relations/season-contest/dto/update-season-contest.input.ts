import { CreateSeasonContestInput } from './create-season-contest.input'
import { Field, InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateSeasonContestInput extends PartialType(CreateSeasonContestInput) {
  @Field({ description: 'Example field' })
  seasonId: string

  @Field({ description: 'Example field' })
  contestId: string
}
