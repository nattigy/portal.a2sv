import { Field, InputType } from '@nestjs/graphql'
import { UpdateSeasonTopicProblemInput } from '../../season-topic-problem/dto/update-season-topic-problem.input'

@InputType()
export class CreateSeasonTopicInput {
  @Field({ description: 'seasonId represents the season id' })
  seasonId: string

  @Field({
    description: 'topic id represents the topic id to add to the season',
  })
  topicId: string

  @Field(() => [UpdateSeasonTopicProblemInput], { nullable: true })
  problems?: UpdateSeasonTopicProblemInput[]
}

@InputType()
export class SeasonTopicId {
  @Field()
  seasonId: string

  @Field()
  topicId: string
}