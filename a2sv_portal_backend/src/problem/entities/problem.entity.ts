import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Tag } from '../../tag/entities/tag.entity'
import { SeasonTopicProblem } from '../../season-topic-problem/entities/season-topic-problem.entity'

@ObjectType()
export class Problem {
  @Field(() => String)
  id: string
  @Field()
  title: string
  @Field()
  platform: string
  @Field()
  link: string
  @Field()
  difficulty: string
  @Field(() => [Tag], { nullable: true })
  tags?: Tag[]
  @Field(() => [SeasonTopicProblem], { nullable: true })
  seasonTopics?: SeasonTopicProblem[]
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}
