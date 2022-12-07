import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FilterContestInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  link?: string

  @Field({ nullable: true })
  div?: string

  @Field({ nullable: true })
  startTime?: Date

  @Field({ nullable: true })
  endTime?: Date
}
