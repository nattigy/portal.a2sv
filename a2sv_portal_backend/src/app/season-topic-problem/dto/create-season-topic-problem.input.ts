import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateSeasonTopicProblemInput {
  @Field()
  seasonId: string

  @Field()
  topicId: string

  @Field()
  problemId: string
}

@InputType()
export class SeasonTopicProblemId {
  @Field()
  seasonId: string

  @Field()
  topicId: string

  @Field()
  problemId: string
}
