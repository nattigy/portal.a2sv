import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ProblemCounts {
  @Field(() => Int, { description: 'number of solved problems per day' })
  solvedCount: number

  @Field(() => Int, { description: 'number of wrong submissions problems per day' })
  wrongCount: number
}
