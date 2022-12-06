import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SeasonTopicProblemUserId {
  @Field()
  seasonId: string
  @Field()
  topicId: string
  @Field()
  problemId: string
  @Field()
  userId: string
}
