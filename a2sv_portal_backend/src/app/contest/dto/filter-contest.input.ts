import { Field, InputType } from '@nestjs/graphql'
import { DateTimeFilter } from '../../../common/filter-types/date-filter'

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

  @Field(() => DateTimeFilter, { nullable: true })
  startTime?: Date

  @Field(() => DateTimeFilter, { nullable: true })
  endTime?: Date

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter
}
