import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { UserContestProblemStatusEnum } from '@prisma/client'
import { Problem } from '../../../problem/entities/problem.entity'
import { Contest } from './../../../contest/entities/contest.entity';

@ObjectType()
export class UserSeasonContestProblem {
  @Field()
  userId: string

  @Field()
  contestId: string

  @Field()
  problemId: string

  @Field(() => UserContestProblemStatusEnum)
  status: UserContestProblemStatusEnum

  @Field(() => Int)
  numberOfAttempts: number

  @Field(() => Int)
  numberOfMinutes: number

  @Field(() => Problem)
  problem: Problem

  @Field(() => Contest)
  contest: Contest

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}

registerEnumType(UserContestProblemStatusEnum, { name: 'UserContestProblemStatusEnum' })
