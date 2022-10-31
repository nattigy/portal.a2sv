import { CreateUserContestInput } from './create-user-contest.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserContestInput extends PartialType(CreateUserContestInput) {
  @Field()
  contestId: string
  @Field(() => String)
  userId: string
}
