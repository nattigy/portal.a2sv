import { Field, InputType } from '@nestjs/graphql'
import { StatusEnum } from '@prisma/client'

@InputType()
export class SignUpUserInput {
  
  @Field()
  firstName: string

  @Field()
  middleName: string

  @Field()
  lastName: string

  @Field({ nullable: true })
  status: StatusEnum
  
  @Field()
  email: string
  
  @Field()
  password: string
}
