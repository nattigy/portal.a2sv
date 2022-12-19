import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserProfileAddress {
  @Field()
  country: string

  @Field()
  city: string
}
