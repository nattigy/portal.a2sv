import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Problem {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
