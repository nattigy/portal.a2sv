import { Field, InputType } from '@nestjs/graphql'
import { SeasonTypeEnum } from '@prisma/client'

@InputType()
export class CreateSeasonInput {
  @Field()
  name: string

  @Field(() => SeasonTypeEnum, {
    description: 'seasonType indicates the type of season being created',
  })
  seasonType: SeasonTypeEnum

  @Field()
  duration: string

  isActive: boolean = false

  @Field(() => Date)
  startDate: Date

  @Field(() => Date)
  endDate?: Date
}
