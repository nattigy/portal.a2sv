import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DataAnalytic {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
