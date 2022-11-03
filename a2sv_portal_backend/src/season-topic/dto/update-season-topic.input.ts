import { CreateSeasonTopicInput } from './create-season-topic.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'
import { UpdateSeasonTopicProblemInput } from '../../season-topic-problem/dto/update-season-topic-problem.input'

@InputType()
export class UpdateSeasonTopicInput extends PartialType(
  CreateSeasonTopicInput,
) {
  @Field(() => [UpdateSeasonTopicProblemInput], { nullable: true })
  problems?: UpdateSeasonTopicProblemInput[]
}
