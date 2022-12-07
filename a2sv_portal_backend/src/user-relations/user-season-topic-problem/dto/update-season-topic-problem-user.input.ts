import { Field, InputType, Int } from '@nestjs/graphql'
import { SeasonTopicProblemUserId } from './season-topic-problem-user.id'

@InputType()
export class UpdateSeasonTopicProblemUserInput {
  @Field()
  id: SeasonTopicProblemUserId

  @Field({ nullable: true })
  solved?: boolean

  @Field(() => Int, { nullable: true })
  attempts?: number

  @Field({ nullable: true })
  needHelp?: boolean

  @Field({ nullable: true })
  solutionLink?: string

  @Field(() => Int, { nullable: true })
  timeDedicated?: number
}
