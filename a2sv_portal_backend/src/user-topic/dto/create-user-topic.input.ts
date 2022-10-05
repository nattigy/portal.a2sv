import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserTopicInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
