import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserSeasonInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
