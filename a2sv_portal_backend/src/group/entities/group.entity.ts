import { Field, ObjectType } from '@nestjs/graphql'
import { User } from 'src/user/entities/user.entity'
import { Season } from '../../season/entities/season.entity'

@ObjectType()
export class Group {
  @Field({description:"Id of the group"})
  id: string
  @Field({description:"Name of the group"})
  name: string
  @Field({ nullable: true, description:"The country a group is belonging" })
  country?: string
  @Field({ nullable: true, description:"The school a group is belonging "})
  school?: string
  @Field(() => [User], { nullable: true, description:"Users that belong to that group" })
  users?: User[]
  @Field(() => [Season], { nullable: true, description:"Seasons the group have" })
  seasons?: Season[]
  @Field({ nullable: true, description:"User id of the user that is a head to the group"})
  headId?: string
  @Field(() => User, { nullable: true, description:"User object of the head user to the group" })
  head?: User
  @Field()
  createdAt: Date
}
