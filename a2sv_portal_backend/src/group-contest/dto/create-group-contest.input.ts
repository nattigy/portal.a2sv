import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGroupContestInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
