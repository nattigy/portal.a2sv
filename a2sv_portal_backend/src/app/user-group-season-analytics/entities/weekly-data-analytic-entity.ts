import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ProblemCounts } from './counts-entity'

@ObjectType()
export class StudentWeeklyAnalytic {
  @Field(() => ProblemCounts, {
    description: 'number of solved and wrong submissions problems per day',
  })
  _sum: ProblemCounts

  @Field(() => Int, { description: 'date of problem solved' })
  week: number
}
