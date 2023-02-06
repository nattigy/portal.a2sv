import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class StudentDataAnalytic {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
