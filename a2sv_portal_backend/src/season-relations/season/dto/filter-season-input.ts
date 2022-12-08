import { Field, InputType } from '@nestjs/graphql'
import { SeasonTypeEnum } from '@prisma/client'
import { DateTimeFilter } from '../../../common/filter-types/date-filter'

@InputType()
export class FilterSeasonInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  groupId?: string

  @Field({ nullable: true })
  seasonType?: SeasonTypeEnum

  @Field({ nullable: true })
  isActive?: boolean

  @Field(() => DateTimeFilter, { nullable: true })
  startDate?: DateTimeFilter

  @Field(() => DateTimeFilter, { nullable: true })
  endDate?: DateTimeFilter

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter
}
