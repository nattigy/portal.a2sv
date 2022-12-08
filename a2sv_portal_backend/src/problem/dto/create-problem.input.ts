import { Field, InputType } from '@nestjs/graphql'
import { ProblemDifficultyTypeEnum } from '@prisma/client'
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
  difficulty: ProblemDifficultyTypeEnum

  @Field(() => [CreateTagInput])
  tags: CreateTagInput[]
}
