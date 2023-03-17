import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateContestInput } from './create-contest.input'
import { UpdateProblemInput } from '../../problem/dto/update-problem.input'

@InputType()
export class UpdateContestInput extends PartialType(CreateContestInput) {
  @Field()
  contestId: string

  groups: string[] = []

  problems: UpdateProblemInput[] = []
}
