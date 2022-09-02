import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql'
import { Status } from '@prisma/client'
@InputType()
export class CreateUserInput {
  @Field({})
  email: string

  @Field({})
  password: string
}

registerEnumType(Status, {
  name: 'Status',
})
