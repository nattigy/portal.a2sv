import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Topic {
  @Field(() => ID)
  id: number
  @Field()
  name: string
  @Field({ nullable: true })
  description?: string
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
