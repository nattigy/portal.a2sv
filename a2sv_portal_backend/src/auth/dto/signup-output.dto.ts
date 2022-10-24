import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SignupOutput {
  @Field(() => Int)
  userId: string
}
