import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field()
  firstName: string

  @Field()
  middleName: string

  @Field()
  lastName: string

  @Field()
  email: string

  @Field()
  password: string
}
