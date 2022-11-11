import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql'
import { SeasonType } from '@prisma/client'

@InputType()
export class FilterSeasonInput {
  @Field(() => String)
  id: string
  @Field()
  name: string
  @Field(() => String)
  groupId: string
  @Field()
  seasonType: SeasonType
  @Field()
  isActive?: boolean
  @Field(() => GraphQLISODateTime)
  startDate: Date
  @Field(() => GraphQLISODateTime)
  endDate: Date
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}
