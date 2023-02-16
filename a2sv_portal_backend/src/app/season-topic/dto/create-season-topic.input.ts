import { Field, InputType } from '@nestjs/graphql'
import { CreateResourceInput } from 'src/app/resource/dto/create-resource.input'

@InputType()
export class CreateSeasonTopicInput {
  @Field({ description: 'seasonId represents the season id' })
  seasonId: string

  @Field({
    description: 'topic id represents the topic id to add to the season',
  })
  topicId: string

  @Field(() => [CreateResourceInput], {nullable:true})
  resources?: CreateResourceInput[]

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

// @InputType()
// export class CreateSeasonTopicResourceInput{
//   @Field()
//   seasonId: string

//   @Field()
//   topicId: string

//   @Field()
//   resourceId: string
// }

// @InputType()
// export class SeasonTopicResourceId{
//   @Field()
//   seasonId: string

//   @Field()
//   topicId: string

//   @Field()
//   resourceId: string
// }