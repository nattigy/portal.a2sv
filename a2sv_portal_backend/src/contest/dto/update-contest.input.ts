import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateContestInput } from './create-contest.input'

@InputType()
export class UpdateContestInput extends PartialType(CreateContestInput) {
  @Field()
  contestId: string
}
