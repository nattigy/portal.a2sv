import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateTopicInput {
  @Field()
  topicId: string

  @Field()
  name?: string

  @Field()
  description?: string
}
