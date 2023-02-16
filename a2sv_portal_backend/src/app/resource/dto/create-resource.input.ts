import { Field, InputType } from '@nestjs/graphql'
import { ResourceTypeEnum } from '@prisma/client'
import { CreateSeasonTopicInput } from 'src/app/season-topic/dto/create-season-topic.input'
// import { CreateTopicInput } from 'src/app/topic/dto/create-topic.input'

@InputType()
export class CreateResourceInput {
  @Field(() => ResourceTypeEnum)
  type: ResourceTypeEnum

  @Field()
  name: string

  @Field()
  description: string

  @Field()
  link: string
  
  @Field(() => [CreateSeasonTopicInput])
  seasonTopics: CreateSeasonTopicInput[]
}
