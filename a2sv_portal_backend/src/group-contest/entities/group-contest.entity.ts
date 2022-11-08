import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Contest } from '../../contest/entities/contest.entity'
import { Group } from '../../group/entities/group.entity'
import { Problem } from '../../problem/entities/problem.entity'

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
  contestAttendance?: number
  @Field(() => [ProblemsStat], { nullable: true })
  problemsStat?: ProblemsStat[]
}

@ObjectType()
export class ProblemsStat {
  @Field(() => Int)
  numberOfProblems: number
  @Field(() => Int)
  numberOfStudents: number
  @Field(() => [ProblemsSolved])
  problems: ProblemsSolved[]
}

@ObjectType()
export class ProblemsSolved {
  @Field(() => Int)
  number: number
  @Field(() => Problem)
  problem: Problem
}
