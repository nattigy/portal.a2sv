import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Problem } from '../../problem/entities/problem.entity'

@ObjectType()
export class Tag {
  @Field(() => Int)
  id: number
  @Field()
  name: string
  @Field(() => [Problem], { nullable: true })
  problems?: Problem[]
}
