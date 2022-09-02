import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql'

@ObjectType()
export class Season {
  @Field(() => ID)
  id: number
  @Field()
  name: string
  @Field(() => GraphQLISODateTime)
  startDate: Date
  @Field(() => GraphQLISODateTime)
  endDate: Date
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date

  constructor(
    id: number,
    name: string,
    startDate: Date,
    endDate: Date,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id
    this.name = name
    this.startDate = startDate
    this.endDate = endDate
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
