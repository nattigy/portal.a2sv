import { Field, ObjectType } from '@nestjs/graphql'
import { User } from 'src/user/entities/user.entity'
import { Season } from '../../season/entities/season.entity'

@ObjectType()
export class Group {
  @Field()
  id: string
  @Field()
  name: string
  @Field()
  createdAt: Date
  @Field({ nullable: true })
  country?: string
  @Field({ nullable: true })
  school?: string
  @Field(() => [User], { nullable: true })
  users?: User[]
  @Field(() => [Season], { nullable: true })
  seasons?: Season[]
  @Field({ nullable: true })
  headId?: string
  @Field(() => User, { nullable: true })
  head?: User
}
