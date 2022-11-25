import { Field, ObjectType } from '@nestjs/graphql'
import { GroupContest } from '../../group-contest/entities/group-contest.entity'
import { Problem } from '../../problem/entities/problem.entity'

@ObjectType()
export class Contest {
  @Field()
  id: string
  @Field()
  name: string
  @Field()
  link: string
  @Field({ nullable: true })
  div?: string
  @Field(() => [GroupContest], { nullable: true })
  groupContests?: GroupContest[]
  @Field(() => Date)
  startTime: Date
  @Field(() => Date)
  endTime: Date
  @Field(() => [Problem])
  problems: Problem[]
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}
