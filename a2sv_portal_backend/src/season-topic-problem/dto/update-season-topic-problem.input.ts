import { CreateSeasonTopicProblemInput } from './create-season-topic-problem.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateSeasonTopicProblemInput extends PartialType(
  CreateSeasonTopicProblemInput,
) {
  @Field()
  seasonId: string
  @Field()
  topicId: string
  @Field()
  problemId: string
}
