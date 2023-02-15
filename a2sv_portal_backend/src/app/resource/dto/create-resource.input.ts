import { Field, InputType } from '@nestjs/graphql'
import { Resource, ResourceTypeEnum } from '@prisma/client'
// import { CreateTopicInput } from 'src/app/topic/dto/create-topic.input'

@InputType()
export class CreateResourceInput {
  @Field(() => ResourceTypeEnum)
  type: ResourceTypeEnum

  @Field()
  name: string

  @Field()
  description: string

  @Field()
  link: string

  // @Field(() => [CreateTopicInput])
  // topics: CreateTopicInput[]
}
