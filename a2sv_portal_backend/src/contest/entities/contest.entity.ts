import { Field, ObjectType } from '@nestjs/graphql'
import { GroupContest } from '../../group-contest/entities/group-contest.entity'
import { Problem } from '../../problem/entities/problem.entity'

@ObjectType()
export class Contest {
  @Field(() => String)
  id: string
  @Field(() => String)
  name: string
  @Field(() => String)
  link: string
  @Field(() => String, { nullable: true })
  div?: string
  @Field(() => [GroupContest], { nullable: true })
  groupContests?: GroupContest[]
  @Field(() => Date)
  startTime: Date
  @Field(() => Date)
  endTime: Date
  @Field(() => [Problem])
  problems: Problem[]
}
