import { Field, InputType } from '@nestjs/graphql'
import { DateTimeFilter } from '../../../common/filter-types/date-filter'
import { StringFilter } from '../../../common/filter-types/string-filter'

@InputType()
export class FilterGroupInput {
  @Field({ nullable: true })
  id?: string

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter

  @Field({ nullable: true })
  country?: string

  @Field({ nullable: true })
  school?: string

  @Field({ nullable: true })
  headId?: string

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter
}
