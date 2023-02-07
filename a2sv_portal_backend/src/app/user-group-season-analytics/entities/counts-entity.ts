import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/app/user/entities/user.entity';

@ObjectType()
export class ProblemCounts {

    @Field(() => Int, { description: 'number of solved problems per day' })
    solvedCount: number
  
    @Field(() => Int, { description: 'number of wrong submissions problems per day' })
    wrongCount: number
}
