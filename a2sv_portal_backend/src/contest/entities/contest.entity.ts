import { Field, ObjectType } from '@nestjs/graphql'
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

  @Field(() => Date)
  startTime: Date

  @Field(() => Date)
  endTime: Date

  @Field(() => [Problem])
  problems: Problem[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}