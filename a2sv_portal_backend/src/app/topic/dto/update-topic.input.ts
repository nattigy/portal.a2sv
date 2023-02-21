import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateTopicInput {
  @Field()
  topicId: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  description?: string
}
