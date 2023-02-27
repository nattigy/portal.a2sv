import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Topic {
  @Field({ description: 'Id of the topic' })
  id: string

  @Field({ description: 'Name of the topic' })
  name: string

  @Field({ description: 'Description of the topic', nullable: true })
  description?: string

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date
}
