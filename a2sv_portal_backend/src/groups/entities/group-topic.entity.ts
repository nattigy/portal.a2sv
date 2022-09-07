import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Topic } from 'src/topic/entities/topic.entity'
import { GroupTopicProblem } from './group-topic-problem.entity'
import { Group } from './group.entity'

@ObjectType()
export class GroupTopic {
  @Field(() => Int)
  groupId: number
  @Field(() => Int)
  topicId: number
  @Field(() => Group, { nullable: true })
  group?: Group
  @Field(() => Topic, { nullable: true })
  topic?: Topic
  @Field(() => GroupTopicProblem, { nullable: true })
  problems?: GroupTopicProblem[]
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  constructor(
    groupId: number,
    topicId: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.groupId = groupId
    this.topicId = topicId
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
