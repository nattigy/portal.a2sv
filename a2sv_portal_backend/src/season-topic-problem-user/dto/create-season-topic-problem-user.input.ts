import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSeasonTopicProblemUserInput {
  @Field()
  seasonId: string
  @Field()
  topicId: string
  @Field()
  problemId: string
  @Field()
  userId: string
}
