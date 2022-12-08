import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FilterUserSeasonTopicProblemInput {
  @Field({ nullable: true })
  seasonId?: string

  @Field({ nullable: true })
  topicId?: string

  @Field({ nullable: true })
  problemId?: string

  @Field({ nullable: true })
  userId?: string
}
