import { Field, InputType, Int } from '@nestjs/graphql'
import { UserSeasonTopicProblemId } from './create-user-season-topic-problem.input'

@InputType()
export class UpdateUserSeasonTopicProblemInput {
  @Field()
  id: UserSeasonTopicProblemId

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
