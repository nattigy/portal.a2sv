import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class LoginOutput {
  @Field()
  accessToken: string
  @Field(() => Int)
  userId: number
}
