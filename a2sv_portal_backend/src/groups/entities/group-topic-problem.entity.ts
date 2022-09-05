import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Problem } from 'src/problem/entities/problem.entity'
import { GroupTopic } from './group-topic.entity'

@ObjectType()
export class GroupTopicProblem {
  @Field(() => Int)
  groupId: number
  @Field(() => Int)
  topicId: number
  @Field(() => Int)
  problemId: number
  @Field(() => GroupTopic, { nullable: true })
  groupTopic?: GroupTopic
  @Field(() => Problem, { nullable: true })
  problem?: Problem
  @Field(() => GroupTopicProblemUser, { nullable: true })
  users: GroupTopicProblemUser[]
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  constructor(
    groupId: number,
    topicId: number,
    problemId: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.groupId = groupId
    this.topicId = topicId
    this.problemId = problemId
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
