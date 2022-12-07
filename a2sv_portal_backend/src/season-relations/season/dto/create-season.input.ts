import { Field, GraphQLISODateTime, InputType, registerEnumType } from '@nestjs/graphql'
import { SeasonTypeEnum } from '@prisma/client'
import { SeasonType } from '../entities/season-type.enum'

@InputType()
export class CreateSeasonInput {
  @Field()
  name: string

  @Field(() => SeasonType, {
    description: 'seasonType indicates the type of season being created',
  })
  seasonType: SeasonType

  @Field()
  duration:string

  @Field()
  isActive:boolean

  @Field(() => GraphQLISODateTime, { defaultValue: new Date(), nullable: true })
  startDate: Date

  @Field(() => GraphQLISODateTime, { defaultValue: new Date(), nullable: true })
  endDate?: Date
}


registerEnumType(SeasonTypeEnum, {
  name: 'SeasonTypeEnum',
})