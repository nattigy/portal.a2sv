import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUsersUpdateTopicComfortabilityInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
