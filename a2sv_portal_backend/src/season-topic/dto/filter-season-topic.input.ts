import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FilterSeasonTopicInput {
  @Field({ description: 'season id of the season', nullable: true })
  seasonId?: string
  @Field({ description: 'topic id of the topic', nullable: true })
  topicId?: string
}

@InputType()
export class SeasonTopicProblemId {
  @Field()
  seasonId: string
  @Field()
  problemId: string
  @Field()
  topicId: string
}
