import { Field, GraphQLISODateTime, ObjectType, registerEnumType } from '@nestjs/graphql'
import { SeasonTypeEnum } from '@prisma/client'

@ObjectType()
export class Season {
  @Field({ description: `Season Id` })
  id: string

  @Field({ description: `Season Name` })
  name: string

  @Field(() => SeasonTypeEnum, {
    description: `Type of the season is it Camp or Education or Project`,
  })
  seasonType: SeasonTypeEnum

  @Field({ description: `Season Duration` })
  duration: string

  @Field({
    nullable: true,
    description: `Implies if the season active currently or ended/inactive`,
  })
  isActive?: boolean

  @Field(() => GraphQLISODateTime, { description: `The start date of the season` })
  startDate: Date

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: `The end date of the season`,
  })
  endDate?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date
}

registerEnumType(SeasonTypeEnum, { name: 'SeasonTypeEnum' })
