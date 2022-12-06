import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql'
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
  @Field(() => GraphQLISODateTime, { nullable: true })
  startDate?: Date
  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate?: Date
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}
