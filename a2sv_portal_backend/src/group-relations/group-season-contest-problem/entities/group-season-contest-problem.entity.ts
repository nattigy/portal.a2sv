import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Problem } from 'src/problem/entities/problem.entity';
import { Contest } from '../../../contest/entities/contest.entity';

@ObjectType()
export class GroupSeasonContestProblem {
  @Field({ description: 'Example field (placeholder)' })
  groupId: string

  @Field({ description: 'Example field (placeholder)' })
  seasonId: string

  @Field({ description: 'Example field (placeholder)' })
  contestId: string

  @Field({ description: 'Example field (placeholder)' })
  problemId: string
  
  @Field(() => Problem)
  problem: Problem

  @Field(() => Contest)
  contest: Contest

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
