import { Field, InputType } from '@nestjs/graphql'
import { CreateSeasonInput } from 'src/season/dto/create-season.input'
import { Season } from '../../season/entities/season.entity'

@InputType()
export class CreateTopicInput {
  @Field()
  name: string
  @Field({ nullable: true })
  description?: string
  @Field(() => CreateSeasonInput)
  season: CreateSeasonInput
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}
