import { CreateGroupTopicInput } from './create-group-topic.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGroupTopicInput extends PartialType(CreateGroupTopicInput) {
  @Field(() => Int)
  id: number;
}
