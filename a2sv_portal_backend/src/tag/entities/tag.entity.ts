import { Field, ObjectType } from '@nestjs/graphql'
import { Problem } from '../../problem/entities/problem.entity'

@ObjectType()
export class Tag {
  @Field(() => String)
  id: string

  @Field()
  name: string

  @Field(() => [Problem], {nullable: true})
  problems?: Problem[]
}
