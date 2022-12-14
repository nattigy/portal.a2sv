import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGroupSeasonContestProblemInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
