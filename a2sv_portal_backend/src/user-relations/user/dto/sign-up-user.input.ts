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

  @Field({ name: 'status', nullable: true })
  statusEnum: StatusEnum
  
  @Field()
  email: string
  
  @Field()
  password: string
}
