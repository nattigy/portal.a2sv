import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateSeasonTopicInput {
  @Field(() => String, { description: 'seasonId represents the season id' })
  seasonId: string
  @Field(() => String, {
    description: 'topic id represents the topic id to add to the season',
  })
  topicId: string
}
