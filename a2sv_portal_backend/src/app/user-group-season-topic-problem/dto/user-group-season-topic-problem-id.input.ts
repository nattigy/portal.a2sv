import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserGroupSeasonTopicProblemId {
  @Field()
  userId: string

  @Field()
  groupId: string

  @Field()
  seasonId: string

  @Field()
  topicId: string

  @Field()
  problemId: string
}
