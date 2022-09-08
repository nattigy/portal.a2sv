import { CreateGroupTopicProblemUserInput } from './create-group-topic-problem-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGroupTopicProblemUserInput extends PartialType(CreateGroupTopicProblemUserInput) {
  @Field(() => Int)
  id: number;
}
