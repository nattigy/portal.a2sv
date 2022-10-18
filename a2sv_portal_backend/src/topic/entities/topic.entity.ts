import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { GroupTopicSeason } from '../../group-topic-season/entities/group-topic-season.entity'
import { UserTopic } from '../../user-topic/entities/user-topic.entity'

@ObjectType()
export class Topic {
  @Field(() => ID)
  id: number
  @Field()
  name: string
  @Field({ nullable: true })
  description?: string
  @Field(() => [GroupTopicSeason], { nullable: true })
  seasonGroups?: GroupTopicSeason[]
  @Field(() => [UserTopic], { nullable: true })
  users?: UserTopic[]
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date

  constructor(
    id: number,
    name: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
