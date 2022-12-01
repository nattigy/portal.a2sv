import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSeasonContestInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
