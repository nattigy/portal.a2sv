import { Field, InputType } from '@nestjs/graphql'
// import { CreateTopicInput } from 'src/app/topic/dto/create-topic.input'

@InputType()
export class CreateResourceInput {
  @Field()
  type: string

  @Field()
  name: string

  @Field()
  description: string

  @Field()
  link: string

  // @Field(() => [CreateTopicInput])
  // topics: CreateTopicInput[]
}
