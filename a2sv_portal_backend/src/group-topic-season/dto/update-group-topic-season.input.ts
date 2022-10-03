import { CreateGroupTopicSeasonInput } from './create-group-topic-season.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'
import { CreateGroupTopicSeasonProblemInput } from '../../group-topic-season-problem/dto/create-group-topic-season-problem.input'

@InputType()
export class UpdateGroupTopicSeasonInput {
  @Field(() => Int)
  groupId: number
  @Field(() => Int)
  topicId: number
  @Field(() => Int)
  seasonId: number
  @Field(() => [CreateGroupTopicSeasonProblemInput], { nullable: true })
  problems?: CreateGroupTopicSeasonProblemInput[]
}
