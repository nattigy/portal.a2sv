import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GroupTopicProblem } from 'src/group-topic-problem/entities/group-topic-problem.entity'
import { Group } from 'src/groups/entities/group.entity'
import { Season } from 'src/season/entities/season.entity'
import { Topic } from 'src/topic/entities/topic.entity'

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
  @Field(() => [GroupTopicProblem], { nullable: true })
  problems?: GroupTopicProblem[]
  @Field(() => Int)
  seasonId: number
  @Field(() => Season)
  season?: Season
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
