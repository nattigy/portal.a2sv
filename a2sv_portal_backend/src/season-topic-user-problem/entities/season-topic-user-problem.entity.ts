import { Field, Int, ObjectType } from '@nestjs/graphql'
import { SeasonTopicProblem } from '../../season-topic-problem/entities/season-topic-problem.entity'
import { User } from '../../user/entities/user.entity'

@ObjectType()
export class SeasonTopicUserProblem {
  @Field()
  seasonId: string
  @Field()
  topicId: string
  @Field()
  problemId: string
  @Field()
  userId: string
  @Field(() => SeasonTopicProblem)
  seasonTopicProblem: SeasonTopicProblem
  @Field(() => User)
  user: User
  @Field({ defaultValue: false })
  solved: boolean
  @Field(() => Int, { defaultValue: 0 })
  attempts: number
  @Field({ defaultValue: false })
  needHelp: boolean
  @Field({ nullable: true })
  solutionLink?: string
  @Field(() => Int)
  timeDedicated: number
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}