import { Field, InputType } from '@nestjs/graphql'
import { ResourceTypeEnum } from '@prisma/client'

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

@InputType()
export class SeasonTopicResourceId {
  @Field()
  resourceId: string

  @Field()
  seasonId: string

  @Field()
  topicId: string
}
