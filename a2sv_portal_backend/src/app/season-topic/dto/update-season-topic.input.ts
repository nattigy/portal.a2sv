import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateSeasonTopicResourceInput } from 'src/app/season-topic-resource/dto/create-season-topic-resource.input'
import { UpdateSeasonTopicProblemInput } from '../../season-topic-problem/dto/update-season-topic-problem.input'
import { CreateSeasonTopicInput } from './create-season-topic.input'

@InputType()
export class UpdateSeasonTopicInput extends PartialType(CreateSeasonTopicInput) {
  @Field(() => String, { description: 'seasonId represents the season id' })
  seasonId: string

  @Field(() => String, {
    description: 'topic id represents the topic id to add to the season',
  })
  topicId: string

  @Field(() => [UpdateSeasonTopicProblemInput], { nullable: true })
  problems?: UpdateSeasonTopicProblemInput[]

  @Field(() => [CreateSeasonTopicResourceInput], {nullable:true})
  seasonTopicResources?: CreateSeasonTopicResourceInput[]

}
