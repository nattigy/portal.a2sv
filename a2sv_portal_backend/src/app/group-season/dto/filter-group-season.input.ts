import { Field, InputType } from '@nestjs/graphql'
import { JoinRequestEnum } from '@prisma/client'
import { DateTimeFilter } from 'src/common/filter-types/date-filter'

@InputType()
export class FilterGroupSeasonInput {
  @Field({ nullable: true })
  groupId?: string

  @Field({ nullable: true })
  seasonId?: string

  @Field({ nullable: true })
  isActive?: boolean

  @Field({ nullable: true })
  headId?: string

  @Field(() => JoinRequestEnum, { nullable: true })
  joinRequest?: JoinRequestEnum

  @Field(() => DateTimeFilter, { nullable: true })
  startDate?: DateTimeFilter

  @Field(() => DateTimeFilter, { nullable: true })
  endDate?: DateTimeFilter

}
