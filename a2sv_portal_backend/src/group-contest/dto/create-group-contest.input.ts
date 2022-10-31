import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGroupContestInput {
  @Field(() => String, {nullable: true})
  groupId: string
  @Field(() => String, {nullable: true})
  contestId: string
}
