import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class AddTopicToSeasonInput {
  @Field()
  topicId: string
  @Field()
  seasonId: string
}
