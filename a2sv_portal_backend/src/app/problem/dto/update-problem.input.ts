import { Field, InputType, PartialType } from '@nestjs/graphql'
import { ProblemDifficultyTypeEnum } from '@prisma/client'
import { CreateTagInput } from '../../tag/dto/create-tag.input'

@InputType()
export class UpdateProblemInput{
  @Field()
  problemId: string

  @Field()
  title?: string

  @Field()
  platform?: string

  @Field()
  link?: string

  @Field(() => ProblemDifficultyTypeEnum, { description: 'Difficulty of the question' })
  difficulty?: ProblemDifficultyTypeEnum

  @Field(() => [CreateTagInput])
  tags?: CreateTagInput[]
}
