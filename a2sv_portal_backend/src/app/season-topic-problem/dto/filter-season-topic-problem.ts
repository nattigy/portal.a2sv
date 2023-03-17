import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SeasonTopicProblemFilter {
  @Field({ nullable: true })
  seasonId?: string

  @Field({ nullable: true })
  topicId?: string

  @Field({ nullable: true })
  problemId?: string
}
