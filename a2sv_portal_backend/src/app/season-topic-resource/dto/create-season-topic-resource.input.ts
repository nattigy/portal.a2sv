import { Field, InputType } from '@nestjs/graphql'
import { ResourceTypeEnum } from '@prisma/client'
import { SeasonTopic } from 'src/app/season-topic/entities/season-topic.entity'

@InputType()
export class CreateSeasonTopicResourceInput {

  @Field()
  seasonId: string

  @Field()
  topicId: string
  
  @Field(() => ResourceTypeEnum)
  type: ResourceTypeEnum

  @Field()
  name: string

  @Field()
  description: string

  @Field()
  link: string

}
