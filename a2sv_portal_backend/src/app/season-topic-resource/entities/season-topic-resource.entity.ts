import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql'
import { Resource } from 'src/app/resource/entities/resource.entity'

@ObjectType()
export class SeasonTopicResource {
  @Field()
  seasonId: string

  @Field()
  topicId: string

  @Field()
  resourceId: string

  @Field(() => Resource)
  resource: Resource

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date
}
