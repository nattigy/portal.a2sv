import { Field, ObjectType } from '@nestjs/graphql'
import { Resource } from 'src/app/resource/entities/resource.entity'

@ObjectType()
export class Topic {
  @Field({ description: 'Id of the topic' })
  id: string

  @Field({ description: 'Name of the topic' })
  name: string

  @Field({ description: 'Description of the topic', nullable:true})
  description?: string

  @Field(() => [Resource])
  resources?: Resource[]
  
  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
