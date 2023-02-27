import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql'

@InputType()
export class CreateContestInput {
  @Field()
  name: string

  @Field()
  link: string

  @Field({ nullable: true })
  div?: string

  @Field(() => GraphQLISODateTime)
  startTime: Date

  @Field(() => GraphQLISODateTime)
  endTime: Date

  @Field(() => GraphQLISODateTime)
  date: Date

  @Field()
  duration: string

  @Field(() => [String], { defaultValue: [] })
  groups: string[]

  @Field(() => [String], { defaultValue: [] })
  problems: string[]

  // @Field(() => [UpdateProblemInput], {defaultValue: []})
  // problems: UpdateProblemInput[]
}
