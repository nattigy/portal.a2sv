import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class StudentDataAnalytic {
  @Field(() => Int, { description: 'number of solved problems per day' })
  solvedCount: number

  @Field(() => Int, { description: 'number of wrong submissions problems per day' })
  wrongCount: number

  @Field(() => Date, { description: 'date of problem solved' })
  createdAt: Date

  @Field(() => Date, { description: 'date of problem solved' })
  updatedAt: Date
}
