import { Field, GraphQLISODateTime, InputType, PartialType } from '@nestjs/graphql'
import { CreateContestInput } from './create-contest.input'
import { UpdateProblemInput } from '../../problem/dto/update-problem.input'

@InputType()
export class UpdateContestInput extends PartialType(CreateContestInput) {
  @Field()
  contestId: string

  @Field(() => GraphQLISODateTime)
  date: Date

  @Field()
  duration: string

  groups: string[] = []
  problems: string[] = []
}
