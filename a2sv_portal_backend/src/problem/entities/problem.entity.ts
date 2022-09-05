import { ObjectType, Field, Int } from '@nestjs/graphql'
import { GroupTopicProblem } from 'src/groups/entities/group-topic-problem.entity'
import { Tag } from '../../tag/entities/tag.entity'

@ObjectType()
export class Problem {
  @Field(() => Int)
  id: number
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
  @Field(() => [GroupTopicProblem], { nullable: true })
  groupTopics?: GroupTopicProblem[]
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}
