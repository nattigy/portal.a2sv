import { Field, InputType, Int } from '@nestjs/graphql'
import { PartialType } from '@nestjs/mapped-types'
import { CreateGroupInput } from './create-group.input'

@InputType()
export class UpdateGroupInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  country?: string
  @Field({ nullable: true })
  school?: string
}
