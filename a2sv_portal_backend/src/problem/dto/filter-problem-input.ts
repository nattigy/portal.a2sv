import { Field, InputType } from '@nestjs/graphql'
import { ProblemDifficultyTypeEnum } from '@prisma/client'
import { StringFilter } from '../../common/filter-types/string-filter'
import { DateTimeFilter } from '../../common/filter-types/date-filter'

@InputType()
export class FilterProblemInput {
  @Field({ nullable: true })
  id?: string

  @Field(() => StringFilter, { nullable: true })
  title?: StringFilter

  @Field({ nullable: true })
  platform?: string

  @Field({ nullable: true })
  link?: string

  @Field(() => ProblemDifficultyTypeEnum, {
    nullable: true,
    description: 'Difficulty of the question',
  })
  difficulty?: ProblemDifficultyTypeEnum

  @Field(() => [String], { nullable: true })
  tags?: string[]

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter
}
