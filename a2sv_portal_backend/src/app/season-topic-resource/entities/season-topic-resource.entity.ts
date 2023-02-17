import { Field, GraphQLISODateTime, ObjectType, registerEnumType } from '@nestjs/graphql'
import { ResourceTypeEnum } from '@prisma/client'
import { SeasonTopic } from 'src/app/season-topic/entities/season-topic.entity'

@ObjectType()
export class SeasonTopicResource {
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

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date
}

registerEnumType(ResourceTypeEnum, {name: 'ResourceTypeEnum'})
