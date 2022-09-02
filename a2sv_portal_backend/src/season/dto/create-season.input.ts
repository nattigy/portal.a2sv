import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql'

@InputType()
export class CreateSeasonInput {
  @Field()
  name: string

  @Field(() => GraphQLISODateTime)
  startDate: Date

  @Field(() => GraphQLISODateTime)
  endDate: Date
}
