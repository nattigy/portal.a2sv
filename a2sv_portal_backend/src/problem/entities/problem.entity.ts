import { Field, ObjectType } from '@nestjs/graphql'
import { Tag } from '../../tag/entities/tag.entity'
import { SeasonTopicProblem } from '../../season-topic-problem/entities/season-topic-problem.entity'

@ObjectType()
export class Problem {
  @Field(() => String,{description: "Id of the problem"})
  id: string
  @Field({description: "Title of the problem"})
  title: string
  @Field({description: "The platform the problem is from"})
  platform: string
  @Field({description: "Link of the question"})
  link: string
  @Field({description: "Difficulty of the question"})
  difficulty: string
  @Field(() => [Tag], { nullable: true, description: "Tag of the question" })
  tags?: Tag[]
  @Field(() => [SeasonTopicProblem], { nullable: true , description: "Season and topic the problem belongs too"})
  seasonTopics?: SeasonTopicProblem[]
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}
