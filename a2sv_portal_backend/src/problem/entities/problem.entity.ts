import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Tag } from '../../tag/entities/tag.entity'

@ObjectType()
export class Problem {
  @Field(() => Int)
  id: number
  @Field()
  title: string
  @Field()
  platform: string
  @Field()
  link: string
  @Field(() => [Tag], { nullable: true })
  tags?: Tag[]
  @Field()
  createdAt?: Date
  @Field()
  updatedAt?: Date
}
