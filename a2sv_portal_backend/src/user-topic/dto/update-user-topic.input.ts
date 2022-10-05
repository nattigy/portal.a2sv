import { CreateUserTopicInput } from './create-user-topic.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserTopicInput extends PartialType(CreateUserTopicInput) {
  @Field(() => Int)
  id: number;
}
