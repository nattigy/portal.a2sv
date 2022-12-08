import { Field, ObjectType } from '@nestjs/graphql'
import { UserSeasonTopic } from '../../user-relations/user-season-topic/entities/user-season-topic.entity'
import { SeasonTopic } from '../../season-relations/season-topic/entities/season-topic.entity'
import { Problem } from '../../problem/entities/problem.entity'

@ObjectType()
export class Topic {
  @Field(() => String, { description: 'Id of the topic' })
  id: string

  @Field({ description: 'Name of the topic' })
  name: string

  @Field({ nullable: true, description: 'Description of the topic' })
  description?: string

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
