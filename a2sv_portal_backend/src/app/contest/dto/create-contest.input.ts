import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql'
import { CreateProblemInput } from '../../problem/dto/create-problem.input'
import { UpdateProblemInput } from '../../problem/dto/update-problem.input'

@InputType()
export class CreateContestInput {
  @Field()
  name: string

  @Field()
  link: string

  @Field({ nullable: true })
  div?: string

  // @Field(() => GraphQLISODateTime)
  // startTime: Date
  //
  // @Field(() => GraphQLISODateTime)
  // endTime: Date

  @Field(() => GraphQLISODateTime)
  date: Date

  @Field()
  duration: string

  @Field(() => [String], { defaultValue: [] })
  groups: string[]

  @Field(() => [UpdateProblemInput], { defaultValue: [] })
  problems: UpdateProblemInput[]

  // @Field(() => [UpdateProblemInput], {defaultValue: []})
  // problems: UpdateProblemInput[]
}
