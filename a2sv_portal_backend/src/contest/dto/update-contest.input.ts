import { Field, InputType, PartialType } from '@nestjs/graphql'
import { UpdateProblemInput } from '../../problem/dto/update-problem.input'
import { CreateContestInput } from './create-contest.input'

@InputType()
export class UpdateContestInput extends PartialType(CreateContestInput) {
  @Field(() => String)
  contestId: string
  @Field(() => String, { nullable: true })
  name?: string
  @Field(() => String, { nullable: true })
  link?: string
  @Field(() => String, { nullable: true })
  div?: string
  @Field(() => Date, { nullable: true })
  startTime?: Date
  @Field(() => Date, { nullable: true })
  endTime?: Date
  @Field(() => [UpdateProblemInput], { nullable: true })
  problems?: UpdateProblemInput[]
}
