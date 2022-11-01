import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class FindGroupContestInput {
  @Field(() => String)
  groupId: string
  @Field(() => String)
  contestId: string
}