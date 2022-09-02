import { Field, InputType } from '@nestjs/graphql'
import { Season } from '../../season/entities/season.entity'

@InputType()
export class CreateTopicInput {
  @Field()
  name: string
  @Field({ nullable: true })
  description?: string
  @Field()
  season: Season
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}
