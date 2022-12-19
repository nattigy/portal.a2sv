import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateGroupSeasonTopicProblemInput {
  @Field()
  groupId: string

  @Field()
  seasonId: string

  @Field()
  topicId: string

  @Field()
  problemId: string
}

@InputType()
export class GroupSeasonTopicProblemId {
  @Field()
  groupId: string

  @Field()
  seasonId: string

  @Field()
  topicId: string

  @Field()
  problemId: string
}
