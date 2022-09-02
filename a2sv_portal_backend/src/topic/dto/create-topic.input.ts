import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTopicInput {
  @Field()
  name: string
  @Field({ nullable: true })
  description?: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}
