import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AddTopicToSeasonInput {
  @Field()
  topicId: string
  @Field()
  seasonId: string
}
