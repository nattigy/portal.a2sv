import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql'

@InputType()
export class CreateSeasonInput {
  @Field()
  name: string

  @Field(() => GraphQLISODateTime, { defaultValue: new Date(), nullable: true })
  startDate?: Date

  @Field(() => GraphQLISODateTime, { defaultValue: new Date(), nullable: true })
  endDate?: Date
}
