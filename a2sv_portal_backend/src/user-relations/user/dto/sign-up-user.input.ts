import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SignUpUserInput {
  
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
