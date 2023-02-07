import { CreateUsersUpdateTopicComfortabilityInput } from './create-users-update-topic-comfortability.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUsersUpdateTopicComfortabilityInput extends PartialType(CreateUsersUpdateTopicComfortabilityInput) {
  @Field(() => Int)
  id: number;
}
