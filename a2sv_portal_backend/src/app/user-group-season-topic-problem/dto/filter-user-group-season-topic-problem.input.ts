import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FilterUserGroupSeasonTopicProblemInput {
  @Field({ nullable: true })
  seasonId?: string

  @Field({ nullable: true })
  topicId?: string

  @Field({ nullable: true })
  problemId?: string

  @Field({ nullable: true })
  groupId?: string

  @Field({ nullable: true })
  userId?: string

  // @Field(() => DateTimeFilter, { nullable: true })
  statusUpdatedAt?: Date
}
