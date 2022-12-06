import { Field, InputType } from '@nestjs/graphql'
import { CreateTagInput } from '../../tag/dto/create-tag.input'

@InputType()
export class CreateProblemInput {
  @Field()
  title: string

  @Field()
  platform: string

  @Field()
  link: string

  @Field()
  difficulty: string

  @Field(() => [CreateTagInput])
  tags: CreateTagInput[]
}
