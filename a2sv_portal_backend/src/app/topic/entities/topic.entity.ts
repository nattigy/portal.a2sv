import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Topic {
  @Field({ description: 'Id of the topic' })
  id: string

  @Field({ description: 'Name of the topic' })
  name: string

  @Field({ description: 'Description of the topic', nullable:true})
  description?: string
  
  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
