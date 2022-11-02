import { CreateSeasonTopicProblemUserInput } from './create-season-topic-problem-user.input'
import { Field, InputType, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateSeasonTopicProblemUserInput extends PartialType(
  CreateSeasonTopicProblemUserInput,
) {
  @Field({ nullable: true })
  solved?: boolean
  @Field(() => Int, { nullable: true })
  attempts?: number
  @Field({ nullable: true })
  needHelp?: boolean
  @Field({ nullable: true })
  solutionLink?: string
}
