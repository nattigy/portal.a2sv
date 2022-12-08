import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserSeasonTopicProblemInput {
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
export class UserSeasonTopicProblemId {
  @Field()
  seasonId: string

  @Field()
  topicId: string

  @Field()
  problemId: string

  @Field()
  userId: string
}