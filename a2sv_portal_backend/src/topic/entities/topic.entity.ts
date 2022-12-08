import { Field, ObjectType } from '@nestjs/graphql'

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
