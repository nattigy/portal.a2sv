import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserContestProblemInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
