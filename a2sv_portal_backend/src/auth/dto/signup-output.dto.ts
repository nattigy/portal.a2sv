import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SignupOutput {
  @Field(() => String)
  userId: string
}
