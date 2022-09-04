import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Topic } from 'src/topic/entities/topic.entity'
import { User } from 'src/user/entities/user.entity'
import { GroupTopic } from './group-topic.entity'

@ObjectType()
export class Group {
  @Field(() => ID)
  id: number
  @Field()
  name: string
  @Field()
  createdAt: Date
  @Field({ nullable: true })
  country?: string
  @Field({ nullable: true })
  school?: string
  @Field(() => [User], { nullable: true })
  users?: User[]
  @Field(() => [GroupTopic], { nullable: true })
  topics?: GroupTopic[]

  constructor(
    id: number,
    name: string,
    createdAt: Date,
    country?: string,
    school?: string,
  ) {
    this.id = id
    this.name = name
    this.createdAt = createdAt
    this.country = country
    this.school = school
  }
}
