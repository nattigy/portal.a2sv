import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FilterGroupSeasonTopicProblemInput {
  @Field({ nullable: true })
  groupId?: string

  @Field({ nullable: true })
  seasonId?: string

  @Field({ nullable: true })
  topicId?: string

  @Field({ nullable: true })
  problemId?: string
}