import { Field, InputType } from '@nestjs/graphql'
import { CreateSeasonTopicResourceInput } from 'src/app/season-topic-resource/dto/create-season-topic-resource.input'

@InputType()
export class CreateSeasonTopicInput {
  @Field({ description: 'seasonId represents the season id' })
  seasonId: string

  @Field({
    description: 'topic id represents the topic id to add to the season',
  })
  topicId: string

  @Field(() => [CreateSeasonTopicResourceInput], { nullable: true })
  seasonTopicResources?: CreateSeasonTopicResourceInput[]

  // @Field(() => [UpdateSeasonTopicProblemInput], { nullable: true })
  // problems?: UpdateSeasonTopicProblemInput[]
}

@InputType()
export class SeasonTopicId {
  @Field()
  seasonId: string

  @Field()
  topicId: string
}
