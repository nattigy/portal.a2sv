import { Field, InputType, Int } from '@nestjs/graphql'
import { PartialType } from '@nestjs/mapped-types'
import { SeasonTopicProblemUserId } from './season-topic-problem-user.id'

@InputType()
export class SeasonTopicProblemUserFilter extends PartialType(
  SeasonTopicProblemUserId,
) {
  @Field(() => Int)
  skip?: number
  @Field(() => Int)
  take?: number
}
