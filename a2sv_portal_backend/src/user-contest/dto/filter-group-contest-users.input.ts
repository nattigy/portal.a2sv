import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FilterGroupContestUsersInput {
  @Field()
  contestId: string
  @Field()
  groupId: string
}
