import { CreateContestInput } from './create-contest.input'
import { Field, InputType, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateContestInput extends PartialType(CreateContestInput) {
  @Field(() => Int)
  id: number
}
