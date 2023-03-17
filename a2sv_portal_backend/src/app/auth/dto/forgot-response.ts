import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ForgotResponse {
  @Field()
  message: string

  @Field()
  expireDateTime: Date

  @Field()
  sentOn: Date
}
