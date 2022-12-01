import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GroupSeason {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
