import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { Group } from 'src/groups/entities/group.entity'
import { Season } from 'src/season/entities/season.entity'

@ObjectType()
export class Topic {
  @Field(() => ID)
  id: number
  @Field()
  name: string
  @Field({ nullable: true })
  description?: string
  @Field(() => Season, { nullable: true })
  season?: Season
  @Field(() => [Group], { nullable: true })
  groups?: Group[]
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
