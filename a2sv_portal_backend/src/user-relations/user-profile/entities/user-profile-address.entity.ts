import { Field, ObjectType } from '@nestjs/graphql'
import { UserProfile } from './user-profile.entity'

@ObjectType()
export class UserProfileAddress {
  @Field()
  country: string

  @Field()
  city: string
}