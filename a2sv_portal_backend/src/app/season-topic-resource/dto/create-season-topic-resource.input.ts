import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateSeasonTopicResourceInput {
  @Field()
  seasonId: string

  @Field()
  topicId: string

  @Field()
  resourceId: string
}

@InputType()
export class SeasonTopicResourceId {
  @Field()
  seasonId: string

  @Field()
  topicId: string

  @Field()
  resourceId: string
}
