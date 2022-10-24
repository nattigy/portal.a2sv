import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserContestProblem {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
