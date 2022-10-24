import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSeasonTopicProblemInput {
  @Field( )
  seasonId: string
  @Field( )
  topicId: string
  @Field( )
  problemId: string
}
