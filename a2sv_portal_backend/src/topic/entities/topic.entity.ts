import { Field, ObjectType } from '@nestjs/graphql'
import { UserTopic } from '../../user-topic/entities/user-topic.entity'
import { SeasonTopic } from '../../season-topic/entities/season-topic.entity'

@ObjectType()
export class Topic {
  @Field(() => String, {description:"Id of the topic"})
  id: string
  @Field({description:"Name of the topic"})
  name: string
  @Field({ nullable: true,description:"Description of the topic"} )
  description?: string
  @Field(() => [SeasonTopic], { nullable: true, description:"Season the topic belongs to"})
  seasons?: SeasonTopic[]
  @Field(() => [UserTopic], { nullable: true, description:"Topic the user has"})
  users?: UserTopic[]
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}
