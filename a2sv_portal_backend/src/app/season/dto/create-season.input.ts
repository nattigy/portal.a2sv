import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql'
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

  @Field(() => Boolean, { nullable: true })
  isActive: boolean = false

  @Field(() => GraphQLISODateTime)
  startDate: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate?: Date
}
