import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateProblemInput } from './create-problem.input'
import { ProblemDifficultyTypeEnum } from '@prisma/client'

@InputType()
export class UpdateProblemInput extends PartialType(CreateProblemInput) {
  @Field()
  problemId: string

  @Field()
  title: string

  @Field()
  platform: string

  @Field()
  link: string

  @Field(() => ProblemDifficultyTypeEnum, { description: 'Difficulty of the question' })
  difficulty: ProblemDifficultyTypeEnum
}
