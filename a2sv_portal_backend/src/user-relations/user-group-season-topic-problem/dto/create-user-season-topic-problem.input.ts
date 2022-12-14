import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserGroupSeasonTopicProblemInput {
  @Field()
  seasonId: string

  @Field()
  topicId: string

  @Field()
  problemId: string

  @Field()
  userId: string
}

@InputType()
export class UserGroupSeasonTopicProblemId {
  @Field()
  seasonId: string

  @Field()
  topicId: string

  @Field()
  problemId: string

  @Field()
  userId: string
}
