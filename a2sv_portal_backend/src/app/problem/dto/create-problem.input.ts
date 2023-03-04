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

  @Field(() => ProblemDifficultyTypeEnum, { description: 'Difficulty of the question' })
  difficulty: ProblemDifficultyTypeEnum

  @Field(() => [CreateTagInput], { defaultValue: [] })
  tags: CreateTagInput[]
}
