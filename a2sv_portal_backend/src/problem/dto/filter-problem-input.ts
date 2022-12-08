import { Field, InputType } from '@nestjs/graphql'
import { ProblemDifficultyTypeEnum } from '@prisma/client';

@InputType()
export class FilterProblemInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  platform?: string

  @Field({ nullable: true })
  link?: string

  @Field({ nullable: true })
  difficulty?: ProblemDifficultyTypeEnum

  @Field(() => [String], { nullable: true })
  tags?: string[]

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date
}
