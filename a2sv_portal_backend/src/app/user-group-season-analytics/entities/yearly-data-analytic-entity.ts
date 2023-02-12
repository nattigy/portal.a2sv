import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/app/user/entities/user.entity';
import { ProblemCounts } from './counts-entity';

@ObjectType()
export class StudentYearlyAnalytic {

  
    @Field(() => ProblemCounts, { description: 'number of solved and wrong submissions problems per day' })
    _sum: ProblemCounts
  
    @Field(() => Int, { description: 'date of problem solved' })
    year: number
}
 