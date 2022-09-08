import { CreateGroupTopicProblemInput } from './create-group-topic-problem.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGroupTopicProblemInput extends PartialType(CreateGroupTopicProblemInput) {
  @Field(() => Int)
  id: number;
}
