import { CreateGroupSeasonContestInput } from './create-group-season-contest.input'
import { Field, InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateGroupSeasonContestInput extends PartialType(CreateGroupSeasonContestInput) {
  @Field({ description: 'Example field' })
  seasonId: string

  @Field({ description: 'Example field' })
  contestId: string

  @Field({ description: 'Example field' })
  groupId: string
}
