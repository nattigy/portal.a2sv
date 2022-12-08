import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { SeasonTypeEnum } from '@prisma/client'

@ObjectType()
export class Season {
  @Field({ description: `Season Id` })
  id: string

  @Field({ description: `Season Name` })
  name: string

  @Field(() => SeasonTypeEnum, { description: `Type of the season is it Camp or Education or Project` })
  seasonType: SeasonTypeEnum

  @Field({ nullable: true, description: `Implies if the season active currently or ended/inactive` })
  isActive?: boolean

  @Field(() => Date, { description: `The start date of the season` })
  startDate: Date

  @Field(() => Date, { description: `The end date of the season` })
  endDate: Date

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}

registerEnumType(SeasonTypeEnum, { name: 'SeasonTypeEnum' })
