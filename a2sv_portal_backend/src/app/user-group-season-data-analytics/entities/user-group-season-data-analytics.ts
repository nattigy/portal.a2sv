import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserGroupSeasonDataAnalytics {
  @Field(() => Int, { description: 'number of solved problems per day' })
  solvedCount: number

  @Field(() => Int, { description: 'number of wrong submissions problems per day' })
  wrongCount: number

  @Field(() => GraphQLISODateTime, { description: 'date of problem solved' })
  createdAt: Date

  @Field(() => GraphQLISODateTime, { description: 'date of problem solved' })
  updatedAt: Date
}
