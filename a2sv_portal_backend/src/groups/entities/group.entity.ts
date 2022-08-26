import { Field, ID, ObjectType } from '@nestjs/graphql'

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
