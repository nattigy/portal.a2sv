import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Contest } from '../../contest/entities/contest.entity'
import { Group } from '../../group/entities/group.entity'

@ObjectType()
export class GroupContest {
  @Field(() => String)
  groupId: string
  @Field(() => String)
  contestId: string
  @Field(() => Contest, { nullable: true })
  contest?: Contest
  @Field(() => Group, { nullable: true })
  group?: Group
  @Field(() => Int, { nullable: true })
  contestAttendance: number
}
