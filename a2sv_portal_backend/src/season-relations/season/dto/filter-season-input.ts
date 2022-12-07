import { Field, InputType } from '@nestjs/graphql'
import { SeasonType } from '../entities/season-type.enum'

@InputType()
export class FilterSeasonInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  groupId?: string

  @Field({ nullable: true })
  seasonType?: SeasonType

  @Field({ nullable: true })
  isActive?: boolean

  @Field(() => Date, { nullable: true })
  startDate?: Date

  @Field(() => Date, { nullable: true })
  endDate?: Date

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
