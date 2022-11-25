import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateSeasonTopicProblemInput } from './create-season-topic-problem.input'

@InputType()
export class UpdateSeasonTopicProblemInput extends PartialType(CreateSeasonTopicProblemInput) {
  @Field()
  problemId: string
}
