import { Field, InputType } from '@nestjs/graphql'
import { UpdateProblemInput } from '../../problem/dto/update-problem.input'

@InputType()
export class CreateContestInput {
  @Field()
  name: string

  @Field()
  link: string

  @Field({ nullable: true })
  div?: string

  @Field()
  startTime: Date

  @Field(() => Date)
  endTime: Date

  @Field(() => [UpdateProblemInput])
  problems: UpdateProblemInput[]
}
