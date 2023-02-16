import { Field, InputType } from '@nestjs/graphql'
import { Resource } from 'src/app/resource/entities/resource.entity'
import { DateTimeFilter } from '../../../common/filter-types/date-filter'
import { StringFilter } from '../../../common/filter-types/string-filter'

@InputType()
export class FilterTopicInput {
  @Field({ nullable: true })
  id?: string

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter

  @Field(() => StringFilter, { nullable: true })
  description?: StringFilter
  
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter
}
