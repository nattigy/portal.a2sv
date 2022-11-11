import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FilterContestInput {
  @Field(() => String, { nullable: true })
  id?: string
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
}
