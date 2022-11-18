import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SeasonTopicProblemFilter {
  @Field()
  seasonId?: string
  @Field()
  topicId?: string
  @Field()
  problemId?: string
}
