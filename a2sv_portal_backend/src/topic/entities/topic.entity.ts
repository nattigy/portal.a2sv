import { Field, ObjectType } from '@nestjs/graphql'
import { UserTopic } from '../../user-topic/entities/user-topic.entity'
import { SeasonTopic } from '../../season-topic/entities/season-topic.entity'

@ObjectType()
export class Topic {
  @Field(() => String)
  id: string
  @Field()
  name: string
  @Field({ nullable: true })
  description: string
  @Field(() => [SeasonTopic], { nullable: true })
  seasons?: SeasonTopic[]
  @Field(() => [UserTopic], { nullable: true })
  users?: UserTopic[]
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}
