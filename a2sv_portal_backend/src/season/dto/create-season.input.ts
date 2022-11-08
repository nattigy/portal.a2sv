import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql'
import { SeasonType } from '../entities/season-type.enum'

@InputType()
export class CreateSeasonInput {
  @Field()
  name: string

  @Field(() => String, {
    description: 'groupId indicates the group id that this season belongs to',
  })
  groupId: string

  @Field(() => SeasonType, {
    description: 'seasonType indicates the type of season being created',
  })
  seasonType: SeasonType

  @Field(() => GraphQLISODateTime, { defaultValue: new Date(), nullable: true })
  startDate?: Date

  @Field(() => GraphQLISODateTime, { defaultValue: new Date(), nullable: true })
  endDate?: Date
}
