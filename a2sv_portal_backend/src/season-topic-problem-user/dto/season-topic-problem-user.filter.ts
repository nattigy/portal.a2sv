import { InputType } from '@nestjs/graphql'
import { PartialType } from '@nestjs/mapped-types'
import { SeasonTopicProblemUserId } from './season-topic-problem-user.id'

@InputType()
export class SeasonTopicProblemUserFilter extends PartialType(
  SeasonTopicProblemUserId,
) {
  skip?: number
  take?: number
}
