import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql'

@ObjectType()
export class UserGroupSeasonMonthlyAnalytic {
  @Field()
  userId: string

  @Field()
  groupId: string

  @Field()
  seasonId: string

  @Field(() => Int)
  solvedCount: number

  @Field(() => Int)
  wrongCount: number

  @Field(() => GraphQLISODateTime)
  createdAt: Date

  @Field(() => GraphQLISODateTime)
  updatedAt: Date
}
